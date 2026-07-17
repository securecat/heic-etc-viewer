## リポジトリ構成

- `heic-etc-viewer.html` — viewer本体（単一HTMLアプリ）
- `chrome-extension/` — 連携Chrome拡張「HeV Sender」。viewer本体とは**別バージョン**で管理する

## バージョン管理

- 更新のたびに semver に従ってバージョンを上げること
- バージョン番号を更新する箇所（3箇所）：
  - `heic-etc-viewer.html` のヘッダー内バージョン表記（`.app-title` スパン末尾の `v?.?.?` テキスト）
  - `CHANGELOG.md`（バージョン見出し）
  - `README.md`（バージョン見出し）
- 変更内容は以下の2箇所に記載すること：

### CHANGELOG.md（全履歴）

- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 形式に従うこと（ただし `[Unreleased]` セクションは使わない）
- 英語セクション → `---` → 日本語セクションの構成
- バージョン見出し形式：`## [1.2.0] - 2026-05-28`
- 変更は `###` 見出しでカテゴリ別に記載すること
  - 英語セクション：`Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security`
  - 日本語セクション：`追加` / `変更` / `非推奨` / `削除` / `修正` / `セキュリティ`

### README.md（最新バージョンのみ）

- Changelog セクション（日本語は 更新履歴 セクション）に**最新バージョンのみ**記載すること
- 英語セクション → `---` → 日本語セクションの構成（CHANGELOG.md と同様）
- 形式：
```
### [2.1.0] - 2026-06-28

#### Added

- content

---

### [2.1.0] - 2026-06-28

#### 追加

- 内容
```
- 古いバージョンの記載は不要（CHANGELOG.md へのリンクで補完済み）

## Chrome拡張「HeV Sender」のバージョン管理

- バージョン記載箇所：`chrome-extension/manifest.json` の `version`
- 変更内容は `chrome-extension/CHANGELOG.md`（全履歴）と `chrome-extension/README.md`（最新バージョンのみ、`### v1.2.0 — YYYY-MM-DD` 形式）に記載すること
- いずれも英語セクション → `---` → 日本語セクションの構成（本体と同様）
- viewer本体とのプロトコル（postMessage の `hev-ready` / `hev-files` / `hev-received`）や対応拡張子リスト（`KNOWN_EXTS`）を変える場合は、両側の整合を必ず確認すること

## Markuplint

- `heic-etc-viewer.html` 内の `<script src="...">`（libheif-bundle.js 等）に対する「`defer` 属性が必要」という Markuplint エラーは無視してよい
  - プログラムの都合上、`defer` を付けると読み込み順序が崩れて動作しなくなるため
  - Markuplint 自体を無効化する必要はない（このルールだけの例外として無視すればOK）

