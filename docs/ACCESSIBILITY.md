# Accessibility

Last updated: 2026-11-07

## Priorities and Goals

This statement covers:

- The HEIC etc Viewer UI (`heic-etc-viewer.html`)
- The UI of the companion Chrome extension HeV Sender (the popup, the options page, the sending screen, and the manual-download panel shown on the original page)

For the UI, we target WCAG 2.2 Level AA, and we treat it as a minimum, not a ceiling. Some of our own rules are stricter than AA (see [Contributor Expectations](#contributor-expectations)).

## Supported Environments

- Browser: tested on Google Chrome and Microsoft Edge (desktop). We have not yet tested other browsers, such as Firefox and Safari. Bookmarks rely on the File System Access API, and AI alt text on Chrome's built-in AI, so they are not available in every browser
- Operating systems: tested on Windows. We have not yet tested macOS or other operating systems
- Screen readers: tested with NVDA on Windows. We have not yet tested other screen readers, including VoiceOver on macOS
- All features can be operated with a keyboard alone, except the divider in comparison views (see [Known Limitations](#known-limitations))

## Known Limitations

- **The divider in comparison views can only be moved with a mouse.** In image diff view (opening a folder that contains two subfolders with matching filenames) and in the before/after preview of lossy conversions, the divider follows the mouse pointer, and clicking pins it in place. There is no keyboard equivalent.
  - Workaround: For image diff, open each subfolder on its own to view the two versions one at a time. The conversion preview is optional; you can convert and download without it.
- **Images are announced only by their file name.** You can generate alt text with the "Generate alt text" button in the lightbox, but it requires Chrome's built-in AI (Prompt API / Gemini Nano), which is available only in Chrome on supported devices.
- **Subtitles and captions in videos are not shown.**
- **The UI has a dark theme only.** It does not follow your operating system's light/dark setting.
- PDFs are shown with the browser's built-in PDF viewer, so their accessibility depends on the browser.

## Reporting Accessibility Barriers

Please report barriers through [GitHub Issues](https://github.com/securecat/heic-etc-viewer/issues). You can write in English or Japanese.

The following details help us, but all of them are optional:

- What you were trying to do
- The screen or feature you were using
- What happened, and what you expected
- Your OS, browser version, and HEIC etc Viewer version (or HeV Sender version)
- Any assistive technology you use, such as a screen reader

You don't need to tell us about any disability. Screenshots and recordings are not required.

## Response Process

HEIC etc Viewer is developed by an individual, so we can't promise a deadline for replies or fixes. We will respond as quickly as we can.

- We will reply on the issue once we've seen your report
- If there is a workaround, we will share it
- Before releasing a fix, we may ask you to confirm that it works for you
- Fixes are recorded in [CHANGELOG.md](https://github.com/securecat/heic-etc-viewer/blob/main/CHANGELOG.md)

## Contributor Expectations

These expectations apply equally to human contributors and coding agents.

When you change the UI:

- Use native form controls (`<input>`, `<select>`, `<textarea>`). Don't use `<div>` or `<span>` as buttons; use `<button>` for actions on the page and `<a>` for navigation
- Don't use the `disabled` attribute
- Don't remove focus indicators (no `outline: none`)
- Don't remove link underlines
- Keep text contrast at 7:1 or higher for body text and 4.5:1 or higher for secondary text, in both light and dark themes
- Keep non-text elements, such as borders and icons, at 3:1 or higher against adjacent colors
- Don't apply `opacity` to elements that need contrast
- Make sure no information or functionality is lost when text is displayed at 16px or larger in Japanese and 14px or larger in English
- Use `font-family: sans-serif` (don't use `system-ui`)
- Don't dismiss status messages automatically
- Don't add anything that moves on its own, such as auto-scrolling

After the change, check that everything can be operated with a keyboard alone, and that a screen reader such as NVDA reads the content correctly.

In addition, in this repository:

- When you add a mouse operation to the lightbox, such as dragging, also provide a way to do it with the keyboard
- Single-key shortcuts in the lightbox can be turned off in Settings, so that they don't conflict with screen reader key commands. When you add one, make it follow this setting, and add it to the shortcut list in the Guide and to the description of the setting
- Anything placed over thumbnails, images, or videos (badges, buttons, and so on) can end up on any color. Give it an opaque background and a contrasting border, so that it stays visible on any image
- The UI is available in English and Japanese. When you add or change text, including accessible names (`aria-label`), update both languages in the i18n dictionary

## Ownership and Maintenance

This statement is maintained by the maintainer, securecat. We update it when we add features or when the tested environments change.

## Feedback on This Statement

Suggestions about this statement or our approach to accessibility are also welcome through [GitHub Issues](https://github.com/securecat/heic-etc-viewer/issues).

---

# アクセシビリティ

最終更新：2026-11-07

## 優先事項と目標

この文書が対象とするのは、次のとおりです。

- HEIC etc Viewer のUI（`heic-etc-viewer.html`）
- 連携Chrome拡張 HeV Sender のUI（ポップアップ、オプションページ、送出画面、元のページに表示する手動ダウンロードパネル）

UIは WCAG 2.2 のレベル AA を目標とし、これを上限ではなく下限と考えています。AAより厳しい独自の基準もあります（[貢献者への期待](#貢献者への期待)を参照）。

## 対応している環境

- ブラウザ：Google Chrome、Microsoft Edge（いずれもデスクトップ版）で動作を確認済み。Firefox や Safari など、ほかのブラウザではまだ試していません。ブックマークは File System Access API を、AIによる代替テキストは Chrome 内蔵のAIを使うため、すべてのブラウザで使えるわけではありません
- OS：Windows で動作を確認済み。macOS など、ほかのOSではまだ試していません
- スクリーンリーダー：Windows の NVDA で読み上げを確認済み。macOS の VoiceOver など、ほかのスクリーンリーダーではまだ試していません
- 比較表示の境界線を除き、すべての機能をキーボードだけで操作できます（[既知の制限](#既知の制限)を参照）

## 既知の制限

- **比較表示の境界線は、マウスでしか動かせません。** 画像のDiff表示（同じファイル名を持つ2つのサブフォルダを含むフォルダを開いたとき）と、非可逆変換の変換前後のプレビューでは、境界線がマウスポインターに追従し、クリックでその位置に固定されます。キーボードで同じことをする手段はありません。
  - 回避策：画像のDiff表示は、サブフォルダを1つずつ開けば、2つのバージョンを1枚ずつ見られます。変換前後のプレビューは任意で、プレビューしなくても変換・ダウンロードできます。
- **画像は、ファイル名だけが読み上げられます。** ライトボックスの「代替テキストを生成」ボタンで代替テキストを生成できますが、Chrome 内蔵のAI（Prompt API / Gemini Nano）が必要なため、対応した端末の Chrome でしか使えません。
- **動画の字幕は表示されません。**
- **UIはダークテーマのみです。** OSのライト／ダークの設定には追従しません。
- PDFはブラウザ内蔵のPDFビューアーで表示するため、そのアクセシビリティはブラウザに左右されます。

## アクセシビリティの問題を報告する

問題は [GitHub Issues](https://github.com/securecat/heic-etc-viewer/issues) で報告してください。日本語でも英語でも構いません。

次のことを書いてもらえると助かりますが、どれも任意です。

- 何をしようとしていたか
- 使っていた画面や機能
- 何が起きたか、どうなると思っていたか
- OS、ブラウザのバージョン、HEIC etc Viewer のバージョン（または HeV Sender のバージョン）
- 使っている支援技術（スクリーンリーダーなど）

障害の有無や内容を書く必要はありません。スクリーンショットや録画も必須ではありません。

## 対応の流れ

HEIC etc Viewer は個人で開発しているため、返信や修正の期限はお約束できません。それでも、できるかぎり早く対応します。

- 報告を確認したら、Issue で返信します
- 回避策があれば、お知らせします
- 修正をリリースする前に、問題が解消したかどうかの確認をお願いすることがあります
- 修正の内容は [CHANGELOG.md](https://github.com/securecat/heic-etc-viewer/blob/main/CHANGELOG.md) に記載します

## 貢献者への期待

ここに挙げることは、人間の貢献者にもコーディングエージェントにも、同じように求めます。

UIを変更するときは、次を守ってください。

- フォームにはネイティブの要素（`<input>`・`<select>`・`<textarea>`）を使う。`<div>` や `<span>` をボタンの代わりにしない。画面内の操作には `<button>`、ページの移動には `<a>` を使う
- `disabled` 属性を使わない
- フォーカスインジケーターを消さない（`outline: none` を使わない）
- リンクの下線を消さない
- テキストのコントラスト比は、本文で 7:1 以上、補足的なテキストで 4.5:1 以上にする。ライトテーマとダークテーマのそれぞれで満たす
- 境界線やアイコンなど、テキスト以外の要素も、隣り合う色に対して 3:1 以上にする
- コントラストが必要な要素に `opacity` を使わない
- 文字サイズは、日本語で 16px 以上、英語で 14px 以上で表示した場合に情報や機能に欠損がないように心がける
- `font-family` は `sans-serif` にする（`system-ui` は使わない）
- ステータスメッセージを自動で消さない
- 自動スクロールなど、ひとりでに動くものを作らない

変更したあとは、キーボードだけですべて操作できること、NVDA などのスクリーンリーダーで内容が正しく読み上げられることを確認してください。

このリポジトリでは、さらに次を守ってください。

- ライトボックスにドラッグなどのマウス操作を足すときは、同じことをキーボードでもできるようにする
- ライトボックスの1文字キーのショートカットは、スクリーンリーダーのキー操作と競合しないよう、設定で無効にできます。足すときは、この設定に従うようにし、ガイドのショートカット一覧と設定の説明にも書き足す
- サムネイルや画像・動画の上に重ねるもの（バッジやボタンなど）は、下が何色になるか分かりません。どんな画像の上でも見えるよう、不透明な背景と、背景との差がはっきりした縁を付ける
- UIは英語と日本語に対応しています。文言（`aria-label` などのアクセシブルな名前を含む）を足したり変えたりするときは、i18n の辞書の両方の言語を更新する

## 責任者と保守

この文書は、メンテナーの securecat が管理しています。機能を追加したときや、動作を確認した環境が変わったときに更新します。

## この文書へのフィードバック

この文書やアクセシビリティへの取り組み方についての提案も、[GitHub Issues](https://github.com/securecat/heic-etc-viewer/issues) で受け付けています。
