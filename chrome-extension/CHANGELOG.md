# Changelog

All notable changes to HeV Sender will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
