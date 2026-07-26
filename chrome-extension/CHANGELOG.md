# Changelog

All notable changes to HeV Sender will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
