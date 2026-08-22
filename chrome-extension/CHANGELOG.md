# Changelog

All notable changes to HeV Sender will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.7.0] - 2026-08-22

### Added

- MKV is now sent as well, matching HEIC etc Viewer v3.25.0, which can play MKV. Since no browser can play MKV inline, it is usually placed as a plain link rather than a `<video>` element, so links ending in `.mkv` are collected too (as videos). Because MKV and WebM share the same EBML container magic bytes, files are now told apart by reading the container's DocType element instead of guessing from the extension alone

## [1.6.0] - 2026-08-16

### Added

- WMV is now sent as well, matching HEIC etc Viewer v3.22.0, which can play WMV. Since no browser can play WMV inline, it is usually placed as a plain link rather than a `<video>` element, so links ending in `.wmv` are collected too (as videos). Files whose content is ASF but whose URL says otherwise are also recognised, by the same magic-byte check used for the other formats

## [1.5.2] - 2026-08-13

### Changed

- The extension icon is now tone-inverted (a white "HeV" on black). When you send from a page, the original page, the sender tab, and the HEIC etc Viewer tab end up side by side; once tabs get narrow — with the viewer already open, or after sending from several pages — the sender's icon was hard to tell apart from the viewer's. The inverted icon makes the two distinguishable at a glance

## [1.5.1] - 2026-08-03

### Changed

- The "Files that could not be fetched" list on the sender tab and the manual-download panel list on the original page are now numbered lists (`<ol>`), so it is easier to keep track of how far you have gotten when downloading many files one by one

## [1.5.0] - 2026-08-01

### Added

- Media inside iframes is now collected. The scanner previously ran only in the tab's top frame, so images and videos in embedded pages (iframes) were never found; it now runs in every frame of the tab and the results are merged with cross-frame duplicates removed. Works for cross-origin iframes as well. The in-page retry for hotlink-protected media also runs in the frame the media came from, so that frame's cookies and Referer are used

## [1.4.1] - 2026-07-26

### Fixed

- Files whose actual content differs from their URL extension are now sent under the extension of the real format, detected from the file's magic bytes. For example, when a CDN returns WebP for a `.jpg` URL, the file now arrives as `.webp` instead of a mislabeled `.jpg` that extension-based tools (some image viewers, uploaders, etc.) fail to open. Spelling variants of the same format (`.jpeg`/`.jpg`/`.jfif`, `.tif`/`.tiff`, `.heif`/`.heic`, and the `.mp4`/`.mov` container family) keep their original extension

### Added

- `.jfif` added to the known extensions, matching the viewer's v3.18.0 support

## [1.4.0] - 2026-07-25

### Added

- "Show a manual-download panel on the original page" button under the "Files that could not be fetched" list: it overlays a small panel on the original page listing the failed URLs as links. Hotlink protection only accepts requests coming from the page itself (Referer and cookies), so links living in that page can still save media that neither fetch strategy could reach — e.g. hotlink-protected files on a different subdomain. Save via right-click "Save link as…", or click a link and save from the tab that opens, then add the file to HEIC etc Viewer by drag & drop. The panel is injected only when the user presses the button, closes with its Close button or the Esc key, and requires no new permissions

### Changed

- Default settings: every "What to send" type (images / CSS background images / videos / PDF) now starts checked, the small-image threshold defaults to 100×100px (was 10×10px), and the small-video threshold defaults to 200KB (was 2KB). Users who already saved their own settings are not affected

## [1.3.0] - 2026-07-19

### Added

- In-page retry for hotlink-protected media: some sites reject requests that don't come from their own pages (checking the Referer header or session cookies, often disguised as 404). When the extension's direct fetch fails, it now retries the fetch inside the original tab's page context, where cookies and the Referer are naturally present — so same-origin media that only the page itself can access can still be collected. No new permissions are required, and the retried request stays within that page's own context

## [1.2.0] - 2026-07-18

### Added

- "Send again" button on the sender tab after a send completes (or times out): the fetched files are kept in memory while the sender tab stays open, so if you accidentally close the viewer tab — or the viewer did not respond — you can send the same files again without re-fetching. Closing the sender tab discards the kept files

## [1.1.0] - 2026-07-18

### Added

- New "CSS background images" choice (off by default) under "What to send" in the options: collects images referenced by CSS `background-image`, including the `::before` / `::after` pseudo-elements of every element. The small-image filter based on actual fetched dimensions applies to them as well, so sprite fragments and tiny textures can still be excluded

## [1.0.0] - 2026-07-18

### Added

- Initial release
- Send images, videos, and PDFs from the current page to HEIC etc Viewer (v3.15.0 or later)
- Popup toggles to exclude small images (default: on) and small videos (default: off)
- Options page: destination URL override, what to send (images / videos / PDF), small-image size threshold (default: width 10px / height 10px), and small-video size threshold (default: 2KB)
- UI in English and Japanese, following the browser language

---

# 更新履歴

## [1.7.0] - 2026-08-22

### 追加

- MKVも送出するように（MKVを再生できる HEIC etc Viewer v3.25.0 に合わせた対応）。MKVはどのブラウザもインライン再生できない都合上、`<video>` 要素ではなく単なるリンクとして置かれていることが多いため、`.mkv` で終わるリンクも（動画として）収集する。MKVとWebMは先頭のEBMLコンテナのマジックバイトが共通のため、拡張子だけに頼らず、コンテナのDocType要素を読んで判別するようにした

## [1.6.0] - 2026-08-16

### 追加

- WMVも送出するように（WMVを再生できる HEIC etc Viewer v3.22.0 に合わせた対応）。WMVはどのブラウザもインライン再生できない都合上、`<video>` 要素ではなく単なるリンクとして置かれていることが多いため、`.wmv` で終わるリンクも（動画として）収集する。URLの拡張子と中身が食い違うASFファイルも、他の形式と同じマジックナンバー判定で認識する

## [1.5.2] - 2026-08-13

### 変更

- 拡張のアイコンを階調反転（黒地に白の「HeV」）に変更。送出時は元のページ・送出タブ・HEIC etc Viewer のタブが並ぶため、viewerを既に開いていた場合や複数のページから送出した場合にタブ幅が狭くなると、送出タブのアイコンがviewer本体と見分けにくかった。反転により一目で区別できるように

## [1.5.1] - 2026-08-03

### 変更

- Sendタブの「取得できなかったファイル」一覧と、元ページの手動ダウンロードパネルの一覧を、番号付きリスト（`<ol>`）に変更。多数のファイルを順にダウンロードしていく時に、どこまで進んだかを項番で把握しやすく

## [1.5.0] - 2026-08-01

### 追加

- iframe内のメディアも収集されるように。従来の収集スクリプトはタブのトップフレームでしか実行されず、埋め込みページ（iframe）内の画像・動画は対象外だった。タブ内の全フレームで収集を実行し、フレーム横断で重複を除去してマージする。クロスオリジンのiframeにも対応。直リンク対策メディアのページ内リトライも、そのメディアの由来フレームの文脈（Cookie・Referer）で実行される

## [1.4.1] - 2026-07-26

### 修正

- URLの拡張子と実際の中身が異なるファイルを、実形式（先頭バイトのマジックナンバーで判定）の拡張子で送出するように修正。例：`.jpg` のURLでWebPを返すCDNの画像は `.webp` として届くようになり、拡張子で処理を分岐するツール（一部の画像ビューアーやアップローダー等）でも保存後のファイルを正しく開ける。同一形式の表記ゆれ（`.jpeg`/`.jpg`/`.jfif`、`.tif`/`.tiff`、`.heif`/`.heic`、`.mp4`/`.mov` 系コンテナ）は元の表記を維持する

### 追加

- viewer本体の v3.18.0 に合わせ、既知の拡張子に `.jfif` を追加

## [1.4.0] - 2026-07-25

### 追加

- 「取得できなかったファイル」一覧の下に「元のページに手動ダウンロードパネルを表示」ボタンを追加：元ページ上に、失敗したURLをリンクとして並べる小さなパネルをオーバーレイ表示する。直リンク対策は「ページ本人からのリクエスト」（Referer・Cookie）しか通さないため、ページ内に置かれたリンクなら、2段構えのfetchでも取れなかったメディア（例：サブドメイン違い×直リンク対策）も保存できる。リンクの右クリック「名前を付けてリンク先を保存」か、クリックして開いたタブから保存し、ドラッグ＆ドロップで HEIC etc Viewer に追加する。パネルはボタンを押した時だけ注入され、閉じるボタンまたはEscキーで閉じられる。新しい権限は不要

### 変更

- デフォルト設定を変更：「送出対象」は全種類（画像／CSS背景画像／動画／PDF）がチェック済みに、「小さい画像の大きさ」は 100×100px（旧 10×10px）に、「小さい動画の大きさ」は 200KB（旧 2KB）に。設定を保存済みのユーザーには影響しない

## [1.3.0] - 2026-07-19

### 追加

- 直リンク対策されたメディアのページ内リトライ：サイトによっては自分のページ以外からのリクエストを拒否する(RefererヘッダーやセッションCookieを検査し、404を装うことが多い)。拡張からの直接取得が失敗した場合、元タブのページ文脈でfetchをやり直すようにした。CookieとRefererが自然に付くため、ページ本人にしか取得できない同一オリジンのメディアも収集できる。追加の権限は不要で、リトライのリクエストはそのページ自身の文脈の中で完結する

## [1.2.0] - 2026-07-18

### 追加

- 送出完了後(またはタイムアウト後)の送出タブに「もう一度送出する」ボタンを追加：取得済みファイルは送出タブが開いている間メモリ上に保持されるため、viewerタブをうっかり閉じてしまった場合や、viewerが応答しなかった場合に、再取得なしで同じファイルを再送出できる。送出タブを閉じると保持中のファイルは破棄される

## [1.1.0] - 2026-07-18

### 追加

- オプションの送出対象に「CSS背景画像」を追加（デフォルトOFF）：CSSの`background-image`で参照される画像を、全要素の`::before`／`::after`擬似要素も含めて収集する。取得後の実寸による小さい画像フィルタも適用されるため、スプライトの断片や小さなテクスチャは除外できる

## [1.0.0] - 2026-07-18

### 追加

- 初回リリース
- 表示中のページの画像・動画・PDFを HEIC etc Viewer（v3.15.0以降）へ送出
- ポップアップに「小さい画像を含めない」（デフォルトON）と「小さい動画を含めない」（デフォルトOFF）のチェックボックス
- オプションページ：送出先URLの上書き、送出対象（画像／動画／PDF）、小さい画像の閾値（デフォルト：幅10px／高さ10px）、小さい動画の閾値（デフォルト：2KB）
- ブラウザの言語設定に応じた英語・日本語UI
