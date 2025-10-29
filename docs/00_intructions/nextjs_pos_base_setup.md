# Next.js POSベースセットアップ

- ドキュメント命名規則・フォルダ構成は「00_naming_and_structure_reference.md」を参照。

## ディレクトリ構成例

├── .github/copilot-instructions.md      # AIエージェント用手順書
├── docs/
│   ├── 00_intructions/                  # ドキュメント手順・命名規則
│   ├── 01_画面系/                       # 画面ごとのドキュメント・Mock
│   │   ├── [画面名]/                    # 各画面は日本語名＋画面フォルダ
│   │   ├── 00_画面イメージ/             # 各画面のMock HTML/CSS
│   ├── 02_機能系/                       # 機能（API、ロジック等）
│   ├── 03_DM系/                         # データモデル関連
│   └── gen_process_jp.md                # SI・AIプロセス手順
├── src/
│   ├── app/                             # Next.js App Router（画面・API）
│   │   ├── [画面名]/page.tsx            # 各画面の物理フォルダ
│   │   ├── api/                         # APIルート（Mockデータ）
│   │   ├── layout.tsx                   # メインレイアウト・テーマ
│   │   └── ClientLayout.tsx             # Material UI用クライアントプロバイダー
│   ├── components/                      # 共通Reactコンポーネント
│   └── styles/                          # 共通CSS/スタイル
├── package.json                         # プロジェクト依存関係
└── README.md                            # プロジェクト概要
