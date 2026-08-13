# HeV Sender

A Chrome extension that sends images, videos, and PDFs from the page you are viewing to [HEIC etc Viewer](https://securecat.github.io/heic-etc-viewer/).

## Overview

Click **Send** in the popup, and the extension collects the images, videos, and PDFs found on the current tab, then opens them in HEIC etc Viewer (v3.15.0 or later) — ready to browse, compare, and convert with all the viewer's features.

- **Exclude small images** (on by default): skips tracking pixels, spacers, and other tiny images. The threshold (default: width 100px / height 100px, either side at or below counts as small) can be changed in the options
- **Exclude small videos**: skips videos at or below a file-size threshold (default: 200KB)
- The options page also lets you choose what to send (images / CSS background images / videos / PDF — all on by default) and override the destination URL, e.g. for a locally hosted viewer. CSS background images are collected from `background-image` values, including `::before` / `::after` pseudo-elements
- Media inside iframes (embedded pages) is collected too — the scan runs in every frame of the tab, including cross-origin iframes
- Hotlink-protected media (rejected unless requested by the page itself) is retried inside the original page's context — for iframe media, inside that frame's context — so it can still be collected in most same-origin cases
- Files that still could not be fetched are listed with a button that overlays a **manual-download panel** on the original page: the failed URLs appear there as real links, so right-click "Save link as…" (or saving from the tab a click opens) works even for hotlink-protected media on other subdomains. Saved files can be added to the viewer by drag & drop
- Videos delivered as streaming (`blob:`) sources cannot be fetched and are skipped with a note

The extension's UI follows your browser language: Japanese browsers get Japanese, everything else gets English.

### Privacy & permissions

The extension requests access to all sites so it can download the media files themselves (they are often hosted on CDNs on other domains). The files are handed over directly between browser tabs — nothing is uploaded to any server.

The manual-download panel is injected into the original page only when you press its button, lists only the URLs that failed, and is removed with its Close button or the Esc key.

## Installation

### Chrome Web Store

https://chromewebstore.google.com/detail/hev-sender/palmekgdpbibhjeoflhnocfnhieenebn

> The Chrome Web Store version may lag behind the repository during the review process.

### Developer Mode (Manual Install)

HeV Sender is part of the [heic-etc-viewer repository](https://github.com/securecat/heic-etc-viewer) — its code lives in the `chrome-extension` folder.

1. Download or clone the repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the `chrome-extension` folder inside the repository

## Changelog

### [1.5.2] - 2026-08-13

#### Changed

- The extension icon is now tone-inverted (a white "HeV" on black). When you send from a page, the original page, the sender tab, and the HEIC etc Viewer tab end up side by side; once tabs get narrow — with the viewer already open, or after sending from several pages — the sender's icon was hard to tell apart from the viewer's. The inverted icon makes the two distinguishable at a glance

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HeV Sender（HeVセンダー）

表示中のページの画像・動画・PDFを [HEIC etc Viewer](https://securecat.github.io/heic-etc-viewer/) へ送出するChrome拡張です。

## 概要

ポップアップの**送出する**を押すと、現在のタブ内にある画像・動画・PDFを収集し、HEIC etc Viewer（v3.15.0以降）で開きます。そのままビューアーの機能で閲覧・比較・変換できます。

- **小さい画像を含めない**（デフォルトON）：トラッキングピクセルやスペーサーなどの小さい画像を除外します。閾値（デフォルト：幅100px／高さ100px、どちらか一方でも以下なら「小さい」と判定）はオプションで変更できます
- **小さい動画を含めない**：ファイル容量が閾値（デフォルト：200KB）以下の動画を除外します
- オプションページでは、送出対象（画像／CSS背景画像／動画／PDF、デフォルトはすべてON）の選択と、送出先URLの上書き（ローカルで動かしているviewerに送りたい場合など）ができます。CSS背景画像は`background-image`の参照先を`::before`／`::after`擬似要素も含めて収集します
- iframe（埋め込みページ）内のメディアも収集対象です。収集はタブ内の全フレームで実行され、クロスオリジンのiframeにも対応します
- 直リンク対策されたメディア（ページ本人からのリクエスト以外を拒否するもの）は、元ページの文脈（iframe由来のメディアはそのフレームの文脈）で取得をリトライするため、同一オリジンのケースではほぼ収集できます
- それでも取得できなかったファイルは一覧表示され、**手動ダウンロードパネル**を元のページ上にオーバーレイ表示できます。失敗したURLがページ内の本物のリンクとして並ぶため、右クリック「名前を付けてリンク先を保存」（またはクリックで開いたタブからの保存）が、サブドメイン違いの直リンク対策メディアにも通ります。保存したファイルはドラッグ＆ドロップでviewerに追加できます
- ストリーミング配信（`blob:`）の動画は取得できないため、その旨を表示してスキップします

拡張のUIはブラウザの言語設定に従います。日本語のブラウザでは日本語、それ以外では英語で表示されます。

### プライバシーと権限

メディアファイルそのもの（別ドメインのCDNに置かれていることが多い）をダウンロードするため、すべてのサイトへのアクセス権限を要求します。ファイルの受け渡しはブラウザのタブ間で直接行われ、どこかのサーバーにアップロードされることはありません。

手動ダウンロードパネルは、ボタンを押した時のみ元のページに注入され、取得に失敗したURLだけを表示します。閉じるボタンまたはEscキーで取り除けます。

## インストール

### Chrome ウェブストア

https://chromewebstore.google.com/detail/hev-sender/palmekgdpbibhjeoflhnocfnhieenebn

> Chrome ウェブストア版は、審査中のため最新リリースより古い場合があります。

### デベロッパーモード（手動インストール）

HeV Sender は [heic-etc-viewer リポジトリ](https://github.com/securecat/heic-etc-viewer) の一部で、コードは `chrome-extension` フォルダにあります。

1. リポジトリをダウンロードまたはクローン
2. Chromeで `chrome://extensions` を開く
3. 右上の **デベロッパーモード** を有効にする
4. **パッケージ化されていない拡張機能を読み込む** をクリックし、リポジトリ内の `chrome-extension` フォルダを選択

## 更新履歴

### [1.5.2] - 2026-08-13

#### 変更

- 拡張のアイコンを階調反転（黒地に白の「HeV」）に変更。送出時は元のページ・送出タブ・HEIC etc Viewer のタブが並ぶため、viewerを既に開いていた場合や複数のページから送出した場合にタブ幅が狭くなると、送出タブのアイコンがviewer本体と見分けにくかった。反転により一目で区別できるように

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。
