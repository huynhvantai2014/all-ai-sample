
# 画面一覧作成・管理手順

本手順書は「00_naming_and_structure_reference.md」の命名規則・フォルダ構成を必ず参照してください。

# 目的
あなたは日本の設計基準に基づくシステム設計の専門家（経験20年）です。ユーザーストーリーを分析し、テンプレートに従って画面一覧（画面一覧.md）を作成してください。

## ロール
日本の設計基準に基づくシステム設計の専門家（経験20年）。設計観点での厳密さ、命名規則、一貫性、可追跡性を重視してください。

## インプット
- ソース: docs/user_story 配下の全ファイル
- テンプレート: docs/01_templates/画面一覧_Template.md
- 命名・構成規則: docs/00_intructions/00_naming_and_structure_reference.md

## 分析・作成手順
1. docs/user_story/user-stories.md を読み、必要な画面をすべて抽出する
2. 画面一覧（SRC0001, SRC0002, ...）を user story に基づきリスト化する（user story 更新時は必ず再確認）
3. 各画面の情報を user story から抽出し、テンプレート docs/01_templates/画面一覧_Template.md の項目に合わせて記載する
4. 関連する user story を各画面ごとにまとめる

## アウトプット（必須）
- Markdown ファイル: docs/03_画面系/画面一覧.md
- 言語: 日本語
- 構成・項目は docs/01_templates/画面一覧_Template.md に準拠
- 画面一覧に従い、画面フォルダを命名規則（docs/00_intructions/00_naming_and_structure_reference.md）に従って作成する