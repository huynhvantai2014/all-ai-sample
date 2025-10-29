# Next.jsフルスタック開発手順

- ドキュメント命名規則・フォルダ構成は「00_naming_and_structure_reference.md」を参照。

## 1. 現在のソースコード構成
```
all-ai/
├── .github/copilot-instructions.md      # AIエージェント用手順書
├── docs/
│   ├── 03_画面系/00_画面イメージ/      # 各画面のMock HTML/CSS
│   ├── 00_intructions/                  # 手順書・命名規則・SI標準
│   ├── 01_templates/                    # ドキュメントテンプレート
│   ├── 02_user_story/                   # ユーザーストーリー
│   └── gen_process_jp.md                # SI・AIプロセス手順
├── src/
│   ├── app/
│   │   ├── [画面名]/page.tsx            # 各画面の物理フォルダ
│   │   ├── api/                         # APIルート（Mockデータ）
│   │   ├── layout.tsx                   # メインレイアウト・テーマ
│   │   └── ClientLayout.tsx             # Material UI用クライアントプロバイダー
│   ├── components/                      # 共通Reactコンポーネント
│   ├── models/                          # Mongooseモデル
│   └── utils/                           # ユーティリティ
│   └── lib/mongodb.ts                   # MongoDB接続
├── .env.local                           # 環境変数
├── package.json                         # パッケージ・スクリプト
└── README.md                            # プロジェクト概要
```

## 2. ソースベース再構築手順
1. **リポジトリのクローン：**
   ```bash
   git clone <repo-url>
   cd all-ai
   ```
2. **依存パッケージのインストール：**
   ```bash
   npm install
   ```
3. **環境変数の設定：**
   - `.env.local.example`（存在する場合）をコピーして`.env.local`を作成し、MongoDB情報を編集。
4. **プロジェクト起動：**
   ```bash
   npm run dev
   ```
5. **画面の確認：**
   - `/login`, `/provisional_order`, `/checkout`など物理パスで画面を確認。
   - APIモックは`src/app/`で拡張可能。
6. **テーマ/UIの設定：**
   - `src/components/MuiRootProvider.tsx`でMaterial UIテーマを変更。
   - Mock HTML/CSSは`docs/03_画面系/00_画面イメージ/`でUI参照。
7. **新規画面追加：**
   - `src/app/`に新しい物理フォルダを作成し、`page.tsx`と`'use client'`を追加。
8. **API拡張：**
   - `src/app/api/`に新しいファイルを追加し、MockデータまたはMongoDB接続を実装。

## 3. 設定・ベストプラクティス
- **画面命名：** 物理名を使用し、IDは使用しない。
- **Clientコンポーネント：** hookやwindowを使う場合は必ず`'use client'`を追加。
- **Material UI：** テーマは`MuiRootProvider`でラップ。
- **Mockデータ：** APIはデモ用サンプルデータを返却、拡張容易。
- **認証：** ローカルストレージでMockログイン、実装拡張可能。
- **SSR/Emotion：** キャッシュ設定済み、Next.js 16の制限でFART発生可能性あり。
- **MongoDB：** Mongoose導入済み、APIルートで実装可能。

## 4. 参考ドキュメント・プロセス
- `docs/gen_process_jp.md`：日本SI・AIプロセス標準
- `.github/copilot-instructions.md`：AIエージェント用コードベース規則
- Mock UIは`docs/03_画面系/00_画面イメージ/`で参照

## 5. package.jsonサンプル

```json
{
  "name": "all-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@emotion/cache": "^11.14.0",
    "@emotion/react": "^11.14.0",
    "@emotion/server": "^11.11.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^5.18.0",
    "@mui/material": "^5.18.0",
    "mongoose": "^8.3.2",
    "next": "16.0.0",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.0.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- 上記パッケージをインストールしてソースベースを構築。
- 追加パッケージは`package.json`編集後`npm install`。

## 6. 必要な設定ファイル

- **tsconfig.json**: TypeScript設定、内部import用alias`@/*`、`jsx: react-jsx`。
- **next.config.ts**: Next.js設定、reactCompiler等のオプション。
- **eslint.config.mjs**: ESLint設定、core-web-vitals、typescript、buildフォルダ除外。
- **postcss.config.mjs**: PostCSS設定、Tailwind対応。
- **next-env.d.ts**: Next.js型宣言、手動編集不要。
- **.env.local**: 環境変数（MongoDB接続、secret等）。

> ソースベース再構築時は、上記設定ファイルが揃っているか確認。不足時はリポジトリからコピーまたはLLMで生成。
