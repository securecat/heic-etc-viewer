# HEIC etc Viewer

A single-file local image/video viewer and converter with HEIC, PDF, and ICO support — built for browsing and converting iPhone photo exports.

## Overview

**HEIC etc Viewer** is a single HTML file that runs entirely in your browser. No data is sent to any server — all file processing happens locally between your browser and your local storage. This means it works equally well whether hosted on the web or run locally.
Supports HEIC/HEIF, JPEG, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, MP4, WebM, MOV, PDF, and ICO. Folder navigation is provided via a tree panel. Key features include thumbnail caching, a lightbox viewer with drag-to-select zoom, checkerboard background for transparent images, video loop, and slideshow mode. Static images (HEIC/HEIF, JPEG, PNG, WebP, BMP, TIFF, AVIF) can also be converted and saved as WebP, PNG, JPEG, or PDF — one file at a time, or in bulk as a zip.

### Tech Stack

Built as a single HTML file with no build tools or package dependencies.

- **Vanilla HTML** / **CSS** / **JavaScript** — no frameworks
- **[libheif.js](https://github.com/strukturag/libheif)** — HEIC/HEIF decoding via WebAssembly, loaded from CDN
- **[PDF.js](https://github.com/mozilla/pdf.js)** — PDF thumbnail rendering via WebAssembly, loaded from CDN
- **[jsPDF](https://github.com/parallax/jsPDF)** — PDF generation for the convert-to-PDF feature, loaded from CDN
- **[client-zip](https://github.com/Touffy/client-zip)** — zip generation for bulk conversion downloads, loaded from CDN
- **Canvas API** — thumbnail generation for video frames and zoom region rendering, and image re-encoding for the convert feature
- **File System API** (`webkitdirectory`, `DataTransferItem.webkitGetAsEntry`) — local folder access and directory tree traversal

## Installation

The easiest way is to open the hosted version on GitHub Pages:

**https://securecat.github.io/heic-etc-viewer/**

> Your files never leave your device. 

Alternatively, download heic-etc-viewer.html and open it directly in Chrome.

### Note for local use

Opening via `file://` disables folder drag & drop due to browser security restrictions. To enable it, run a local server in the same folder:

```
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:3000/heic-etc-viewer.html` in Chrome.

## Changelog

### [3.6.0] - 2026-07-11

#### Added

- Full keyboard navigation in the folder tree, based on the WAI-ARIA APG treeview pattern: `↑` `↓` move between visible folders, `→` expands a closed folder, `←` collapses an open folder, `Home`/`End` jump to the first/last visible folder, and typing a character jumps to the next folder whose name starts with it
- Pressing `Enter` or `Space` again on the already-selected folder, or `→` on it when there is nothing left to expand, moves keyboard focus into the gallery; pressing `←` anywhere in the gallery moves focus back to the selected folder in the tree
- An `R` keyboard shortcut in the lightbox that rotates the video 90° counter-clockwise, same as the ↶ button (videos only)
- A "Keyboard operation" section in the Settings & Information dialog describing the folder tree, gallery, and lightbox keyboard controls — previously the only keyboard reference was the hint line at the bottom of the lightbox, which is hidden from screen readers

#### Changed

- The folder tree is now a single Tab stop (roving tabindex): `Tab` enters the tree on the selected folder and one more `Tab` leaves it into the gallery
- Rebuilt the tree's markup as a semantic `<ul role="tree">` / `<li role="treeitem">` / `<ul role="group">` hierarchy with `aria-level`, `aria-setsize`, `aria-posinset`, `aria-expanded`, and `aria-selected`, so screen readers announce folder depth, position, and state correctly
- The disclosure triangle (▶) is now a pointer-only control hidden from assistive technology; keyboard users expand and collapse with the arrow keys on the folder itself
- The keyboard-hint line at the bottom of the lightbox now matches the file being shown (videos: `Z` / `R` / `L`, images: `Z` / `C`, PDFs: `C`) instead of always listing the same keys, and shows only `← →` and `Esc` during a slideshow

#### Fixed

- The `L` (loop) shortcut no longer silently toggles the loop state while viewing images or PDFs, the `C` (checker background) shortcut no longer switches the background while viewing videos, and the `Z` (zoom) shortcut no longer triggers while zooming is unavailable (e.g. while a video is rotated) — each lightbox shortcut now works only when its corresponding button is visible

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューワー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー＆コンバーター。iPhoneから書き出した写真の閲覧・変換に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。
対応形式は、HEIC/HEIF、JPEG、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、MP4、WebM、MOV、PDF、ICOです。フォルダの移動は、ツリーパネルで行えます。主な機能として、サムネイルのキャッシュ、ドラッグ操作でズーム範囲を選択できるライトボックスビューア、透過画像用の市松模様の背景表示、動画のループ再生、スライドショーモードなどを備えています。静止画（HEIC/HEIF、JPEG、PNG、WebP、BMP、TIFF、AVIF）はWebP・PNG・JPEG・PDFに変換して保存することもでき、1ファイルずつでも、まとめてzipでも保存できます。

### 技術スタック

ビルドツールやパッケージの依存関係を使用せず、単一のHTMLファイルとして構築されています。

- **Vanilla HTML** / **CSS** / **JavaScript** — フレームワーク不使用
- **[libheif.js](https://github.com/strukturag/libheif)** — WebAssemblyによるHEIC/HEIFデコード（CDNから読み込み）
- **[PDF.js](https://github.com/mozilla/pdf.js)** — WebAssemblyによるPDFサムネイルのレンダリング（CDNから読み込み）
- **[jsPDF](https://github.com/parallax/jsPDF)** — PDF変換保存機能のPDF生成（CDNから読み込み）
- **[client-zip](https://github.com/Touffy/client-zip)** — 一括変換ダウンロード時のzip生成（CDNから読み込み）
- **Canvas API** — 動画フレームのサムネイル生成・ズーム領域のレンダリング・変換機能での画像再エンコード
- **File System API** (`webkitdirectory`, `DataTransferItem.webkitGetAsEntry`) — ローカルフォルダへのアクセスおよびディレクトリツリーの走査

## インストール

最も簡単な方法は、GitHub Pagesでホストされているバージョンを開くことです：

**https://securecat.github.io/heic-etc-viewer/**

> サーバーへデータが送信されることはありません。ファイルの処理はすべて、ブラウザとローカルストレージの間でローカルに行われます。

あるいは、`heic-etc-viewer.html` をダウンロードし、Chrome で直接開いてください。

### ローカル環境で使用する際の注意点

`file://` 経由で開くと、ブラウザのセキュリティ制限により、フォルダのドラッグ＆ドロップが無効になります。これを有効にするには、同じフォルダ内でローカルサーバーを起動してください：

```
npx serve .
# または
python -m http.server 8080
```

ローカルサーバー起動後、Chromeで `http://localhost:3000/heic-etc-viewer.html` を開きます。

## 更新履歴

### [3.6.0] - 2026-07-11

#### 追加

- フォルダツリーに、WAI-ARIA APG の treeview パターンをベースにしたキーボード操作を追加：`↑` `↓` で表示中のフォルダ間を移動、`→` で閉じたフォルダを展開、`←` で開いたフォルダを折りたたみ、`Home`/`End` で先頭・末尾へ移動、文字キーで頭文字が一致する次のフォルダへジャンプ
- 選択済みのフォルダ上でもう一度 `Enter` または `Space` を押すか、選択済みのフォルダ上で展開するものがない状態で `→` を押すとギャラリーへキーボードフォーカスが移動。ギャラリー内の任意の位置で `←` を押すと、ツリーの選択中フォルダへフォーカスが戻る
- ライトボックスに `R` キーのショートカットを追加。↶ボタンと同じく動画を左に90°回転する（動画のみ）
- 「Settings & Information」ダイアログに「Keyboard operation」セクションを追加し、フォルダツリー・ギャラリー・ライトボックスのキーボード操作を記載（従来はライトボックス下端のヒント行しかキーボード操作の説明がなく、スクリーンリーダーからは読み取れなかった）

#### 変更

- フォルダツリー全体を1つのタブストップに変更（roving tabindex）。`Tab` でツリーに入ると選択中のフォルダにフォーカスが乗り、もう一度 `Tab` でギャラリーへ抜ける
- ツリーのマークアップを `<ul role="tree">` / `<li role="treeitem">` / `<ul role="group">` のセマンティックな階層構造に再構築し、`aria-level`・`aria-setsize`・`aria-posinset`・`aria-expanded`・`aria-selected` を付与。スクリーンリーダーがフォルダの階層・位置・状態を正しく読み上げられるように
- 開閉用の三角記号（▶）はポインタ専用の操作に変更し、支援技術からは非表示に。キーボードではフォルダ自体への矢印キー操作で開閉する
- ライトボックス下端の操作ヒント行を、表示中のファイル種別に合わせて切り替えるように変更（動画：`Z`/`R`/`L`、画像：`Z`/`C`、PDF：`C`。スライドショー中は `← →` と `Esc` のみ）

#### 修正

- 画像・PDF表示中に `L`（ループ）ショートカットが見えないままループ状態を切り替えてしまう問題、動画表示中に `C`（市松背景）ショートカットが効いてしまう問題、ズームできない状態（動画の回転中など）でも `Z`（ズーム）ショートカットが反応してしまう問題を修正。ライトボックスの各ショートカットは、対応するボタンが表示されている時のみ動作するように

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

