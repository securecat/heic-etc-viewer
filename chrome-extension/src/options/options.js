const els = {
  targetUrl: document.getElementById('targetUrl'),
  sendImages: document.getElementById('sendImages'),
  sendVideos: document.getElementById('sendVideos'),
  sendPdf: document.getElementById('sendPdf'),
  sendBgImages: document.getElementById('sendBgImages'),
  smallImgW: document.getElementById('smallImgW'),
  smallImgH: document.getElementById('smallImgH'),
  smallVidKB: document.getElementById('smallVidKB'),
};
const btnSave = document.getElementById('btnSave');
const saveStatus = document.getElementById('saveStatus');

function clampInt(value, fallback) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function collectValues() {
  return {
    targetUrl: els.targetUrl.value.trim(),
    sendImages: els.sendImages.checked,
    sendVideos: els.sendVideos.checked,
    sendPdf: els.sendPdf.checked,
    sendBgImages: els.sendBgImages.checked,
    smallImgW: clampInt(els.smallImgW.value, SETTING_DEFAULTS.smallImgW),
    smallImgH: clampInt(els.smallImgH.value, SETTING_DEFAULTS.smallImgH),
    smallVidKB: clampInt(els.smallVidKB.value, SETTING_DEFAULTS.smallVidKB),
  };
}

async function onSave() {
  const values = collectValues();
  await saveSettings(values);
  // クランプ結果を入力欄へ反映して、保存された値と表示を一致させる
  els.smallImgW.value = values.smallImgW;
  els.smallImgH.value = values.smallImgH;
  els.smallVidKB.value = values.smallVidKB;
  // メッセージは自動消去しない（ユーザーが再度フィールドを編集した時点で消す）
  saveStatus.textContent = chrome.i18n.getMessage('optSaved');
}

async function init() {
  applyDocLang();
  document.getElementById('urlDesc').dataset.i18nArgs = DEFAULT_VIEWER_URL;
  localizeDocument();
  document.title = chrome.i18n.getMessage('optTitle');
  els.targetUrl.placeholder = DEFAULT_VIEWER_URL;

  const s = await getSettings();
  els.targetUrl.value = s.targetUrl;
  els.sendImages.checked = s.sendImages;
  els.sendVideos.checked = s.sendVideos;
  els.sendPdf.checked = s.sendPdf;
  els.sendBgImages.checked = s.sendBgImages;
  els.smallImgW.value = s.smallImgW;
  els.smallImgH.value = s.smallImgH;
  els.smallVidKB.value = s.smallVidKB;

  btnSave.addEventListener('click', onSave);
  // 保存済みメッセージは自動消去しないが、ユーザーの注視が移った明白なタイミングでは消してよい：
  // フィールドの再編集時と、ページ（ウィンドウ）からフォーカスが外れた時
  Object.values(els).forEach(el => {
    el.addEventListener('input', () => { saveStatus.textContent = ''; });
  });
  window.addEventListener('blur', () => { saveStatus.textContent = ''; });
}

init();
