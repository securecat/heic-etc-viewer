// popup / options / sender で共有する定数・設定・i18nユーティリティ

const DEFAULT_VIEWER_URL = 'https://securecat.github.io/heic-etc-viewer/';

const SETTING_DEFAULTS = {
  targetUrl: '',        // 空文字 = デフォルトの送出先を使う
  sendImages: true,
  sendVideos: true,
  sendPdf: false,
  sendBgImages: false,  // CSS背景画像（::before/::after含む）。ノイズが増えがちなのでデフォルトOFF
  smallImgW: 10,        // px。幅または高さがこの値以下なら「小さい画像」
  smallImgH: 10,
  smallVidKB: 2,        // KB。容量がこの値以下なら「小さい動画」
  skipSmallImages: true,  // popup側のチェック状態も記憶する
  skipSmallVideos: false,
};

async function getSettings() {
  const stored = await chrome.storage.sync.get(SETTING_DEFAULTS);
  return { ...SETTING_DEFAULTS, ...stored };
}

function saveSettings(partial) {
  return chrome.storage.sync.set(partial);
}

// data-i18n / data-i18n-html / data-i18n-attr を chrome.i18n で解決する。
// data-i18n-args="a,b" で $1, $2 の置換に対応
function localizeDocument() {
  const args = el => (el.dataset.i18nArgs ? el.dataset.i18nArgs.split(',') : undefined);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = chrome.i18n.getMessage(el.dataset.i18n, args(el));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = chrome.i18n.getMessage(el.dataset.i18nHtml, args(el));
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(',').forEach(pair => {
      const [attr, key] = pair.split(':');
      el.setAttribute(attr, chrome.i18n.getMessage(key));
    });
  });
}

// <html lang> をChromeが解決したUI言語に合わせる（スクリーンリーダーの読み上げ言語のため）
function applyDocLang() {
  const locale = chrome.i18n.getMessage('@@ui_locale') || 'en';
  document.documentElement.lang = locale.split('_')[0];
}
