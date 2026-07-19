# HeV Sender

A Chrome extension that sends images, videos, and PDFs from the page you are viewing to [HEIC etc Viewer](https://securecat.github.io/heic-etc-viewer/).

## Overview

Click **Send** in the popup, and the extension collects the images, videos, and PDFs found on the current tab, then opens them in HEIC etc Viewer (v3.15.0 or later) — ready to browse, compare, and convert with all the viewer's features.

- **Exclude small images** (on by default): skips tracking pixels, spacers, and other tiny images. The threshold (default: width 10px / height 10px, either side at or below counts as small) can be changed in the options
- **Exclude small videos**: skips videos at or below a file-size threshold (default: 2KB)
- The options page also lets you choose what to send (images / CSS background images / videos / PDF) and override the destination URL, e.g. for a locally hosted viewer. CSS background images (off by default) are collected from `background-image` values, including `::before` / `::after` pseudo-elements
- Hotlink-protected media (rejected unless requested by the page itself) is retried inside the original page's context, so it can still be collected in most same-origin cases
- Videos delivered as streaming (`blob:`) sources cannot be fetched and are skipped with a note

The extension's UI follows your browser language: Japanese browsers get Japanese, everything else gets English.

### Privacy & permissions

The extension requests access to all sites so it can download the media files themselves (they are often hosted on CDNs on other domains). The files are handed over directly between browser tabs — nothing is uploaded to any server.

## Installation

### Chrome Web Store

(Coming soon)

### Developer Mode (Manual Install)

1. Download or clone the [heic-etc-viewer](https://github.com/securecat/heic-etc-viewer) repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the `chrome-extension` folder inside the repository

## Changelog

### v1.3.0 — 2026-07-19

#### Added

- In-page retry for hotlink-protected media: when the extension's direct fetch fails, it retries inside the original page's context (where cookies and the Referer are naturally present), so media that only the page itself can access can still be collected

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HeV Sender（HeVセンダー）

表示中のページの画像・動画・PDFを [HEIC etc Viewer](https://securecat.github.io/heic-etc-viewer/) へ送出するChrome拡張です。

## 概要

ポップアップの**送出する**を押すと、現在のタブ内にある画像・動画・PDFを収集し、HEIC etc Viewer（v3.15.0以降）で開きます。そのままビューアーの機能で閲覧・比較・変換できます。

- **小さい画像を含めない**（デフォルトON）：トラッキングピクセルやスペーサーなどの極小画像を除外します。閾値（デフォルト：幅10px／高さ10px、どちらか一方でも以下なら「小さい」と判定）はオプションで変更できます
- **小さい動画を含めない**：ファイル容量が閾値（デフォルト：2KB）以下の動画を除外します
- オプションページでは、送出対象（画像／CSS背景画像／動画／PDF）の選択と、送出先URLの上書き（ローカルで動かしているviewerに送りたい場合など）ができます。CSS背景画像（デフォルトOFF）は`background-image`の参照先を`::before`／`::after`擬似要素も含めて収集します
- 直リンク対策されたメディア（ページ本人からのリクエスト以外を拒否するもの）は、元ページの文脈で取得をリトライするため、同一オリジンのケースではほぼ収集できます
- ストリーミング配信（`blob:`）の動画は取得できないため、その旨を表示してスキップします

拡張のUIはブラウザの言語設定に従います。日本語のブラウザでは日本語、それ以外では英語で表示されます。

### プライバシーと権限

メディアファイルそのもの（別ドメインのCDNに置かれていることが多い）をダウンロードするため、すべてのサイトへのアクセス権限を要求します。ファイルの受け渡しはブラウザのタブ間で直接行われ、どこかのサーバーにアップロードされることはありません。

## インストール

### Chrome ウェブストア

準備中

### デベロッパーモード（手動インストール）

1. [heic-etc-viewer](https://github.com/securecat/heic-etc-viewer) リポジトリをダウンロードまたはクローン
2. Chromeで `chrome://extensions` を開く
3. 右上の **デベロッパーモード** を有効にする
4. **パッケージ化されていない拡張機能を読み込む** をクリックし、リポジトリ内の `chrome-extension` フォルダを選択

## 更新履歴

### v1.3.0 — 2026-07-19

#### 追加

- 直リンク対策されたメディアのページ内リトライ：拡張からの直接取得が失敗した場合、元ページの文脈（CookieとRefererが自然に付く）でfetchをやり直し、ページ本人にしか取得できないメディアも収集できるように

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。
