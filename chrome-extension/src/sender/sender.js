// popup から引き継いだURL一覧を実ファイルとして取得し、
// HEIC etc Viewer を window.open で開いて postMessage で受け渡す

// viewer側の対応拡張子（heic-etc-viewer.html の ALL_EXTS と揃えること）
const KNOWN_EXTS = ['jpg','jpeg','png','gif','webp','avif','svg','bmp','tiff','tif','heic','heif','mp4','webm','mov','ico','pdf'];
const MIME_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
  'application/pdf': 'pdf',
};
const FETCH_TIMEOUT_MS = 60000;
const READY_TIMEOUT_MS = 30000;
const CONCURRENCY = 4;

const statusEl = document.getElementById('senderStatus');
const skipInfoEl = document.getElementById('skipInfo');
const failBlock = document.getElementById('failBlock');
const btnOpenViewer = document.getElementById('btnOpenViewer');
const btnResend = document.getElementById('btnResend');
const btnCloseTab = document.getElementById('btnCloseTab');

// 送出済みFileはタブが生きている限り保持し、HeVタブを誤って閉じた場合などに再送出できるようにする
let sentFiles = null;
let sourceHost = '';
let viewerUrl = '';
let targetOrigin = '*';

const msg = (key, subs) => chrome.i18n.getMessage(key, subs);

function setStatus(text, isError) {
  statusEl.classList.toggle('error', !!isError);
  statusEl.textContent = text;
}

function showCloseButton() {
  btnCloseTab.hidden = false;
}

function closeSelf() {
  chrome.tabs.getCurrent(tab => { if (tab) chrome.tabs.remove(tab.id); });
}

function fileNameFor(url, blob, kind, index, usedNames) {
  let base = '';
  let ext = '';
  if (!url.startsWith('data:')) {
    try { base = decodeURIComponent(new URL(url).pathname.split('/').pop() || ''); } catch (e) {}
  }
  const dot = base.lastIndexOf('.');
  if (dot > 0) {
    const e = base.slice(dot + 1).toLowerCase();
    if (KNOWN_EXTS.includes(e)) { ext = e; base = base.slice(0, dot); }
  }
  if (!ext) ext = MIME_EXT[(blob.type || '').split(';')[0]] || '';
  // 拡張子もMIMEも不明な場合は種別からの推定に頼る（viewer側に実形式の検出があるため許容）
  if (!ext) ext = kind === 'video' ? 'mp4' : kind === 'pdf' ? 'pdf' : 'jpg';
  base = (base || `file-${index + 1}`).replace(/[\\/:*?"<>|]/g, '_');
  let name = `${base}.${ext}`;
  let n = 2;
  while (usedNames.has(name)) name = `${base} (${n++}).${ext}`;
  usedNames.add(name);
  return name;
}

// 元タブに注入してページ文脈でfetchする（直リンク対策のフォールバック）。
// ページと同じ文脈なのでCookie・Refererが自然に付き、同一オリジンのメディアなら取得できる。
// executeScript の戻り値はJSONシリアライズ可能である必要があるため、バイナリはbase64で返す。
// 注入先で単体実行されるためASCIIのみ・自己完結で書くこと
function pageFetch(url) {
  return (async () => {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 60000);
      const res = await fetch(url, { signal: ctrl.signal, credentials: 'include' });
      clearTimeout(timer);
      if (!res.ok) return { ok: false, error: 'HTTP ' + res.status };
      const bytes = new Uint8Array(await res.arrayBuffer());
      let bin = '';
      const CHUNK = 0x8000;
      for (let i = 0; i < bytes.length; i += CHUNK) {
        bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
      }
      return { ok: true, b64: btoa(bin), type: res.headers.get('content-type') || '' };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  })();
}

// 元タブに注入して、取得に失敗したURLのリンク一覧パネルをオーバーレイ表示する（直リンク対策の最終救済）。
// ページ内のリンクからの保存にはそのページのCookie・Refererが付くため、拡張からは取れないものも保存できる。
// 注入先で単体実行されるため自己完結・ASCIIのみで書くこと（表示文字列は引数で受け取る。関数内コメントも不可）。
// リンクに noreferrer を付けないのは意図的（Refererこそがこの救済の要のため）。
// スタイルはShadow DOMで隔離し、A11Y.md準拠（16px・sans-serif・7:1/3:1コントラスト・両テーマ・フォーカス可視）
function showDownloadPanel(opts) {
  const HOST_ID = 'hev-sender-dl-panel';
  const prev = document.getElementById(HOST_ID);
  if (prev) prev.remove();
  const host = document.createElement('div');
  host.id = HOST_ID;
  const root = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = [
    ':host { all: initial; }',
    '.panel { position: fixed; right: 16px; top: 16px; z-index: 2147483647;',
    '  box-sizing: border-box; width: min(480px, calc(100vw - 32px)); max-height: calc(100vh - 32px);',
    '  overflow: auto; background: #ffffff; color: #1f1f1f; border: 2px solid #595959;',
    '  border-radius: 8px; padding: 16px; font-family: sans-serif; font-size: 16px; line-height: 1.6;',
    '  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35); }',
    '.panel h2 { margin: 0 0 8px; font-size: 18px; }',
    '.panel p { margin: 0 0 12px; }',
    '.panel ul { margin: 0 0 12px; padding-left: 20px; }',
    '.panel li { margin: 0 0 8px; word-break: break-all; }',
    '.panel a { color: #1446a0; text-decoration: underline; }',
    '.panel a:hover { text-decoration-thickness: 2px; }',
    '.panel button { font: inherit; border: 1px solid #595959; border-radius: 6px;',
    '  background: #ffffff; color: #1f1f1f; padding: 6px 14px; cursor: pointer; }',
    '.panel button:hover { background: #e8e8e8; }',
    '.panel :is(a, button):focus-visible { outline: 2px solid #1446a0; outline-offset: 2px; }',
    '@media (prefers-color-scheme: dark) {',
    '  .panel { background: #202124; color: #eaeaea; border-color: #8f9099; }',
    '  .panel a { color: #82b3ff; }',
    '  .panel button { background: #2a2b2e; color: #eaeaea; border-color: #8f9099; }',
    '  .panel button:hover { background: #3a3b3f; }',
    '  .panel :is(a, button):focus-visible { outline-color: #82b3ff; }',
    '}',
  ].join('\n');
  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', opts.title);
  panel.tabIndex = -1;
  if (opts.lang) panel.setAttribute('lang', opts.lang);
  const heading = document.createElement('h2');
  heading.textContent = opts.title;
  const hint = document.createElement('p');
  hint.textContent = opts.hint;
  const ul = document.createElement('ul');
  opts.urls.forEach(u => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = u;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = u;
    li.appendChild(a);
    ul.appendChild(li);
  });
  const close = document.createElement('button');
  close.textContent = opts.close;
  close.addEventListener('click', () => host.remove());
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') host.remove(); });
  panel.appendChild(heading);
  panel.appendChild(hint);
  panel.appendChild(ul);
  panel.appendChild(close);
  root.appendChild(style);
  root.appendChild(panel);
  document.documentElement.appendChild(host);
  panel.focus();
}

async function fetchViaTab(tabId, url) {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: pageFetch,
    args: [url],
  });
  const r = results && results[0] && results[0].result;
  if (!r || !r.ok) throw new Error((r && r.error) || 'page fetch failed');
  const bin = atob(r.b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: (r.type || '').split(';')[0] });
}

function fileFromBlob(blob, item, index, usedNames) {
  // 画像・動画URLがエラーページ等にすり替わっているケースを弾く
  if (/^(text\/|application\/(json|xhtml))/.test(blob.type)) throw new Error(`unexpected type: ${blob.type}`);
  const name = fileNameFor(item.url, blob, item.kind, index, usedNames);
  return new File([blob], name, { type: blob.type });
}

async function fetchOne(item, index, usedNames, tabId) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(item.url, { signal: ctrl.signal, credentials: 'omit' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return fileFromBlob(await res.blob(), item, index, usedNames);
  } catch (primaryErr) {
    // 拡張からの「まっさらなリクエスト」は直リンク対策(Referer/Cookie検査)で弾かれることがある。
    // その場合は元タブのページ文脈で再取得を試みる（タブが閉じられていれば素直に失敗扱い）
    if (tabId == null || !/^https?:/.test(item.url)) throw primaryErr;
    try {
      const blob = await fetchViaTab(tabId, item.url);
      return fileFromBlob(blob, item, index, usedNames);
    } catch (e) {
      throw primaryErr;
    }
  } finally {
    clearTimeout(timer);
  }
}

// 取得済みバイトから画像の実寸を測って「小さい画像」を判定する。
// 収集時点で未ロード（naturalWidth=0）だったトラッキングピクセル等もここで捕捉できる。
// デコードできない形式（HEIC等）は判定不能のため「小さくない」扱いで残す
async function isSmallImage(file, payload) {
  if (!payload.skipSmallImages) return false;
  try {
    const bmp = await createImageBitmap(file);
    const small = bmp.width <= payload.smallImgW || bmp.height <= payload.smallImgH;
    bmp.close();
    return small;
  } catch (e) {
    return false;
  }
}

// viewer からの hev-ready / hev-received を待つ
function waitForMessage(win, type, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      window.removeEventListener('message', onMsg);
      reject(new Error('timeout'));
    }, timeoutMs);
    function onMsg(e) {
      if (e.source !== win || !e.data || e.data.type !== type) return;
      clearTimeout(timer);
      window.removeEventListener('message', onMsg);
      resolve(e.data);
    }
    window.addEventListener('message', onMsg);
  });
}

function openViewer(url) {
  // 拡張ページからの window.open は通常ブロックされないが、
  // 万一 null が返る場合に備えてボタン（ユーザー操作）でのフォールバックを用意する
  return new Promise(resolve => {
    const w = window.open(url);
    if (w) { resolve(w); return; }
    setStatus(msg('sndBlocked'), true);
    btnOpenViewer.hidden = false;
    const onClick = () => {
      const w2 = window.open(url);
      if (w2) {
        btnOpenViewer.hidden = true;
        btnOpenViewer.removeEventListener('click', onClick); // 再送出時に多重登録しないよう解除
        statusEl.classList.remove('error');
        resolve(w2);
      }
    };
    btnOpenViewer.addEventListener('click', onClick);
  });
}

// viewer を開いてハンドシェイク→送出する。初回と「もう一度送出する」の両方から呼ぶ
async function sendPhase() {
  btnResend.hidden = true;
  setStatus(msg('sndOpening'));
  const viewerWin = await openViewer(viewerUrl);
  setStatus(msg('sndWaiting'));
  try {
    await waitForMessage(viewerWin, 'hev-ready', READY_TIMEOUT_MS);
    viewerWin.postMessage({
      type: 'hev-files',
      sourceName: sourceHost,
      files: sentFiles,
    }, targetOrigin);
    const received = await waitForMessage(viewerWin, 'hev-received', READY_TIMEOUT_MS);
    setStatus(msg('sndDone', [String(received.count ?? sentFiles.length)]));
  } catch (e) {
    setStatus(msg('sndTimeout'), true);
  }
  // 成否によらず再送出は可能にしておく（タイムアウト後のリトライにも使える）
  btnResend.hidden = false;
  showCloseButton();
}

async function run() {
  applyDocLang();
  localizeDocument();
  btnCloseTab.addEventListener('click', closeSelf);
  setStatus(msg('sndPreparing'));

  const { hevPayload: payload } = await chrome.storage.session.get('hevPayload');
  await chrome.storage.session.remove('hevPayload');
  if (!payload || !Array.isArray(payload.items) || !payload.items.length) {
    setStatus(msg('sndNoPayload'), true);
    showCloseButton();
    return;
  }

  // ── 取得フェーズ ──
  const total = payload.items.length;
  const usedNames = new Set();
  const files = [];
  const failures = [];
  let smallImgSkipped = 0;
  let smallVidSkipped = 0;
  let done = 0;
  setStatus(msg('sndFetching', ['0', String(total)]));

  let cursor = 0;
  async function worker() {
    while (cursor < payload.items.length) {
      const index = cursor++;
      const item = payload.items[index];
      try {
        const file = await fetchOne(item, index, usedNames, payload.tabId);
        if (item.kind === 'video' && payload.skipSmallVideos && file.size <= payload.smallVidKB * 1024) {
          smallVidSkipped++;
        } else if (item.kind === 'image' && await isSmallImage(file, payload)) {
          smallImgSkipped++;
        } else {
          files.push({ index, file });
        }
      } catch (e) {
        failures.push(item.url);
      }
      done++;
      setStatus(msg('sndFetching', [String(done), String(total)]));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  files.sort((a, b) => a.index - b.index); // 並列取得でもページ内の出現順を保つ

  const skipLines = [];
  if (smallImgSkipped) skipLines.push(msg('sndSkippedSmallImg', [String(smallImgSkipped)]));
  if (smallVidSkipped) skipLines.push(msg('sndSkippedSmallVid', [String(smallVidSkipped)]));
  if (payload.blobSkipped) skipLines.push(msg('sndSkippedBlob', [String(payload.blobSkipped)]));
  if (skipLines.length) {
    skipInfoEl.textContent = skipLines.join('\n');
    skipInfoEl.hidden = false;
  }
  if (failures.length) {
    const ul = document.createElement('ul');
    ul.id = 'failList';
    failures.forEach(u => {
      const li = document.createElement('li');
      li.textContent = u;
      ul.appendChild(li);
    });
    failBlock.appendChild(ul);
    // 直リンク対策されたメディアは「元ページからのリクエスト」しか通さないため、拡張側からの
    // 再取得やchrome.downloadsでは救えない（Referer・SameSite Cookieが付かない）。
    // 元ページにリンク一覧のパネルを注入し、ページ文脈での保存（右クリック保存等）に委ねる
    const httpFailures = failures.filter(u => /^https?:/.test(u));
    if (httpFailures.length && payload.tabId != null) {
      const actions = document.createElement('p');
      actions.className = 'fail-actions';
      const btn = document.createElement('button');
      btn.textContent = msg('sndFailPanelBtn');
      const fb = document.createElement('span');
      fb.className = 'fail-panel-status';
      fb.setAttribute('role', 'status');
      btn.addEventListener('click', async () => {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: payload.tabId },
            func: showDownloadPanel,
            args: [{
              urls: httpFailures,
              lang: document.documentElement.lang,
              title: msg('sndPanelTitle'),
              hint: msg('sndPanelHint'),
              close: msg('sndPanelClose'),
            }],
          });
        } catch (e) {
          fb.classList.add('error');
          fb.textContent = msg('sndFailPanelError');
          return;
        }
        fb.classList.remove('error');
        fb.textContent = msg('sndFailPanelShown');
        // パネルの注入自体は済んでいるため、元タブへの切り替えに失敗しても成功扱いのままでよい
        try {
          const tab = await chrome.tabs.get(payload.tabId);
          await chrome.windows.update(tab.windowId, { focused: true });
          await chrome.tabs.update(payload.tabId, { active: true });
        } catch (e) {}
      });
      actions.appendChild(btn);
      actions.appendChild(fb);
      failBlock.appendChild(actions);
    }
    failBlock.hidden = false;
  }
  if (!files.length) {
    setStatus(msg('sndNone'), true);
    showCloseButton();
    return;
  }

  // ── 送出フェーズ ──
  viewerUrl = payload.targetUrl || DEFAULT_VIEWER_URL;
  try {
    const o = new URL(viewerUrl).origin;
    if (o && o !== 'null') targetOrigin = o;
  } catch (e) {
    setStatus(msg('sndTimeout'), true);
    showCloseButton();
    return;
  }
  sourceHost = (payload.source && payload.source.host) || '';
  sentFiles = files.map(f => f.file);
  // タブの自動クローズはしない（結果メッセージが勝手に消えることになるため）。
  // 閉じるのはユーザーの操作に委ね、タブが生きている間は「もう一度送出する」で再送出できる
  await sendPhase();
}

btnResend.addEventListener('click', () => {
  if (sentFiles && sentFiles.length) sendPhase();
});

run();
