// ページに注入して、送出候補（画像・動画・PDF）のURLを収集する。
// 注入先で単体実行されるため、外部の関数・変数を参照しないこと。
// 注入時のエンコーディング事故を避けるため、この関数の中身はASCIIのみで書くこと。
// 例外は executeScript に握りつぶされて result が undefined になる場合があるため、
// 関数内で捕捉して { ok: false, error } として返し、popup 側で表示できるようにする
function collectMedia(opts) {
  try {
    const seen = new Set();
    const items = [];
    let blobSkipped = 0;
    const abs = u => { try { return new URL(u, location.href).href; } catch (e) { return null; } };
    const push = (u, kind) => {
      if (!u) return;
      // blob: URLs live only inside the page and cannot be fetched from the extension
      if (u.startsWith('blob:')) { blobSkipped++; return; }
      if (!/^https?:|^data:/.test(u)) return;
      if (seen.has(u)) return;
      seen.add(u);
      items.push({ url: u, kind });
    };
    if (opts.sendImages) {
      document.querySelectorAll('img').forEach(img => {
        if (opts.skipSmallImages) {
          const w = img.naturalWidth, h = img.naturalHeight;
          // keep images whose size is unknown (not loaded yet = 0)
          if (w > 0 && h > 0 && (w <= opts.smallImgW || h <= opts.smallImgH)) return;
        }
        push(abs(img.currentSrc || img.src), 'image');
      });
    }
    if (opts.sendVideos) {
      document.querySelectorAll('video').forEach(v => {
        // currentSrc is empty when the browser cannot play the source (e.g. WMV), so fall back to src
        let u = v.currentSrc || v.src;
        if (!u) { const srcEl = v.querySelector('source[src]'); u = srcEl ? srcEl.src : ''; }
        push(abs(u), 'video');
      });
      // browsers cannot play WMV/MKV inline, so they are usually placed as plain links instead of a <video>
      const isUnplayableLinkedVideo = u => { try { const p = new URL(u).pathname.toLowerCase(); return p.endsWith('.wmv') || p.endsWith('.mkv'); } catch (e) { return false; } };
      document.querySelectorAll('a[href]').forEach(a => {
        const u = abs(a.href);
        if (u && isUnplayableLinkedVideo(u)) push(u, 'video');
      });
    }
    if (opts.sendBgImages) {
      // collect CSS background images, including ::before/::after pseudo-elements.
      // computed background-image values are already absolutized and quoted with url("...")
      const re = /url\((['"]?)(.*?)\1\)/g;
      const grab = style => {
        const bg = style.backgroundImage;
        if (!bg || bg === 'none') return;
        let m;
        re.lastIndex = 0;
        while ((m = re.exec(bg))) push(abs(m[2]), 'image');
      };
      document.querySelectorAll('*').forEach(el => {
        grab(getComputedStyle(el));
        grab(getComputedStyle(el, '::before'));
        grab(getComputedStyle(el, '::after'));
      });
    }
    if (opts.sendPdf) {
      const isPdfUrl = u => { try { return new URL(u).pathname.toLowerCase().endsWith('.pdf'); } catch (e) { return false; } };
      document.querySelectorAll('a[href]').forEach(a => {
        const u = abs(a.href);
        if (u && isPdfUrl(u)) push(u, 'pdf');
      });
      document.querySelectorAll('embed[src], object[data], iframe[src]').forEach(el => {
        const u = abs(el.getAttribute('src') || el.getAttribute('data') || '');
        if (!u) return;
        const type = (el.getAttribute('type') || '').toLowerCase();
        if (type === 'application/pdf' || isPdfUrl(u)) push(u, 'pdf');
      });
    }
    return { ok: true, items, blobSkipped, source: { host: location.hostname || 'page', title: document.title } };
  } catch (e) {
    return { ok: false, error: String((e && e.stack) || e) };
  }
}

const btnSend = document.getElementById('btnSend');
const statusEl = document.getElementById('popupStatus');
const detailEl = document.getElementById('popupErrorDetail');
const chkImg = document.getElementById('skipSmallImages');
const chkVid = document.getElementById('skipSmallVideos');
let sending = false;

function showError(msgKey, detail) {
  statusEl.classList.add('error');
  statusEl.textContent = chrome.i18n.getMessage(msgKey);
  // 原因調査に使えるよう、実際のエラー内容も併記する
  detailEl.textContent = detail || '';
}

async function init() {
  applyDocLang();
  localizeDocument();
  const s = await getSettings();
  chkImg.checked = s.skipSmallImages;
  chkVid.checked = s.skipSmallVideos;
  chkImg.addEventListener('change', () => saveSettings({ skipSmallImages: chkImg.checked }));
  chkVid.addEventListener('change', () => saveSettings({ skipSmallVideos: chkVid.checked }));
  btnSend.addEventListener('click', onSend);
}

async function onSend() {
  if (sending) return; // disabled属性は使わず、実行中の多重起動だけ抑止する
  sending = true;
  statusEl.classList.remove('error');
  statusEl.textContent = '';
  detailEl.textContent = '';
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !/^https?:/.test(tab.url || '')) { showError('popupNoTab'); return; }
    const s = await getSettings();
    let results;
    try {
      // allFrames: iframe内のメディアも対象にするため、タブ内の全フレームで収集を実行する
      results = await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        func: collectMedia,
        args: [{
          sendImages: s.sendImages,
          sendVideos: s.sendVideos,
          sendPdf: s.sendPdf,
          sendBgImages: s.sendBgImages,
          skipSmallImages: s.skipSmallImages,
          smallImgW: s.smallImgW,
          smallImgH: s.smallImgH,
        }],
      });
    } catch (e) {
      showError('popupError', String(e));
      return;
    }
    // フレームごとの収集結果をマージする。取得リトライ時にフレーム文脈を再現できるよう
    // 各アイテムに由来フレームの frameId を付与し、URLの重複はフレーム横断で除去する。
    // （サンドボックス等で注入できないフレームは result が空になるので読み飛ばす）
    const frames = (results || []).filter(r => r && r.result);
    const okFrames = frames.filter(f => f.result.ok);
    if (!okFrames.length) {
      const failed = frames.find(f => !f.result.ok);
      showError('popupError', failed ? failed.result.error : 'executeScript returned no result');
      return;
    }
    // メインフレーム（frameId 0）の結果を先頭にして、ページ本体の画像が先に並ぶようにする
    const ordered = [...okFrames.filter(f => f.frameId === 0), ...okFrames.filter(f => f.frameId !== 0)];
    const seen = new Set();
    const items = [];
    let blobSkipped = 0;
    for (const f of ordered) {
      blobSkipped += f.result.blobSkipped || 0;
      for (const it of f.result.items) {
        if (seen.has(it.url)) continue;
        seen.add(it.url);
        items.push({ ...it, frameId: f.frameId });
      }
    }
    const source = ordered[0].result.source;
    if (!items.length) { showError('popupNoFiles'); return; }
    // 収集結果を送出ページへ引き継ぐ（バイナリ取得と受け渡しは送出ページが行う）
    await chrome.storage.session.set({ hevPayload: {
      items,
      blobSkipped,
      source,
      // 直リンク対策で拡張からの取得が弾かれた時、元タブのページ文脈で再取得するために使う
      tabId: tab.id,
      // 小さい画像はDOM側でも除外するが、未ロードでサイズ不明のまま通過するものがあるため、
      // 送出ページが取得後の実寸でも再フィルタできるよう閾値も引き継ぐ
      skipSmallImages: s.skipSmallImages,
      smallImgW: s.smallImgW,
      smallImgH: s.smallImgH,
      skipSmallVideos: s.skipSmallVideos,
      smallVidKB: s.smallVidKB,
      targetUrl: s.targetUrl,
    } });
    await chrome.tabs.create({ url: chrome.runtime.getURL('src/sender/sender.html') });
    window.close();
  } catch (e) {
    showError('popupError', String(e));
  } finally {
    sending = false;
  }
}

init();
