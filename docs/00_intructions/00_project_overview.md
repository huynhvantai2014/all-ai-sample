# プロジェクト概要

- ドキュメント命名規則・フォルダ構成は「00_naming_and_structure_reference.md」を参照。

# 次世代 Next.js Full Stack (Material UI, Axios)

## 次世代 Next.js App Router (v13+)

### 1. ジャンププロジェクトの初期化
```bash
npx create-next-app@latest my-app --typescript
cd my-app
```

### 2. Material UI と Axios のインストール
```bash
npm install @mui/material @emotion/react @emotion/styled axios
```

### 3. App Router のフォルダ構成
```
my-app/
├── app/                # App Router: layout.tsx, page.tsx, route.ts, ...
│   ├── page.tsx        # Trang chính
│   ├── layout.tsx      # Layout chung
│   ├── api/            # Route API (backend)
│   └── (module)/       # Các module, sub route
├── components/         # Component UI tái sử dụng
├── services/           # Gọi API (axios instance, hooks)
├── utils/              # Hàm tiện ích chung
├── hooks/              # Custom React hooks
├── theme/              # Cấu hình Material UI theme
├── public/             # Static assets
├── styles/             # CSS/SCSS toàn cục
├── types/              # Định nghĩa TypeScript types/interfaces
└── ...
```

### 4. App Router の使用上の注意
- 毎 route は `app/` フォルダ内の一つのフォルダで、`page.tsx`、`layout.tsx`、`loading.tsx` などがある
- API route は `app/api/` フォルダに置く (例: `app/api/user/route.ts`)
- サーバーコンポーネントとクライアントコンポーネントの使い分け (`'use client'`)
- SSR、streaming、nested layout に優れている

### 5. axios instance の例
```ts
// services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export default axiosInstance;
```

### 6. Material UI の使用
- `theme/theme.ts` でカスタムテーマを作成
- `app/layout.tsx` で `<ThemeProvider>` を包む

### 7. 最佳実践
- サーバーコンポーネントとクライアントコンポーネントを明確に分離
- フォルダ、ファイル名の命名が一貫性 (kebab-case または camelCase)
- `app/` フォルダにビジネスドメインで組織化
- クライアントの再利用可能なロジックに hooks
- シナリオの validate (nếu có) を `utils/` または `schemas/` に置く

### 8. 参考
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Material UI Docs](https://mui.com/)
- [Axios Docs](https://axios-http.com/)

---

## Copilot/AI Agent Instructions for Next.js App Router Project

- Scaffold a new Next.js project with TypeScript and App Router (v13+):
  - Use `npx create-next-app@latest <project-name> --typescript`
- Install dependencies:
  - `@mui/material @emotion/react @emotion/styled axios`
- Use the `app/` directory for all routing and API endpoints:
  - Place page components in `app/`, each route as a folder with `page.tsx`
  - Place API handlers in `app/api/<name>/route.ts`
- Organize code as follows:
  - `components/` for reusable UI
  - `services/` for axios instance and API logic
  - `theme/` for Material UI theme config
  - `hooks/`, `utils/`, `types/` as needed
- Always wrap the app in `<ThemeProvider>` in `app/layout.tsx`
- Use server components by default, add `'use client'` for client components
- Use kebab-case or camelCase for folders/files, be consistent
- Example axios instance:
```ts
// services/axiosInstance.ts
import axios from 'axios';
export default axios.create({ baseURL: '/api', timeout: 10000 });
```
- Example API route:
```ts
// app/api/user/route.ts
import { NextResponse } from 'next/server';
export async function GET() {
  // ...fetch data
  return NextResponse.json({ users: [] });
}
```
- Reference [Next.js App Router Docs](https://nextjs.org/docs/app) and [Material UI Docs](https://mui.com/)
