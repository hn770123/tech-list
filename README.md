# 技術メモ閲覧サイト

このリポジトリは、作成した技術メモ（Markdown形式）をGitHub Pages上で簡単に閲覧するための仕組みを提供しています。

## GitHub Pages

以下のリンクから、HTMLとしてレンダリングされた技術メモの一覧を確認できます。

[👉 技術メモ一覧を見る (GitHub Pages) 👈](https://hn770123.github.io/tech-list/)


> **注意:** 上記URLの `<username>` および `<repository>` は、実際のリポジトリの所有者名とリポジトリ名に置き換えてください。
>
> 例: `https://your-username.github.io/tech-memos/`

## 構成

- `index.html`: 技術メモ一覧を表示するためのメインページです。
- `js/app.js`: Markdownファイルをフェッチし、`marked.js` を用いてHTMLに変換するロジックが含まれています。
- `docs/tech_memos/`: 技術メモのMarkdownファイルが保存されているディレクトリです。
