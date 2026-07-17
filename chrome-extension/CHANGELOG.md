# Changelog

All notable changes to HeV Sender will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
