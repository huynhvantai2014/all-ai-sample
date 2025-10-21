# Hướng dẫn tạo cấu trúc source code Next.js Full Stack (Material UI, Axios)

## Hướng dẫn cho Next.js App Router (v13+)

### 1. Khởi tạo dự án
```bash
npx create-next-app@latest my-app --typescript
cd my-app
```

### 2. Cài đặt Material UI và Axios
```bash
npm install @mui/material @emotion/react @emotion/styled axios
```

### 3. Cấu trúc thư mục đề xuất (App Router)
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

### 4. Lưu ý khi dùng App Router
- Mỗi route là một folder trong `app/`, có thể có `page.tsx`, `layout.tsx`, `loading.tsx`, ...
- API route đặt trong `app/api/` (ví dụ: `app/api/user/route.ts`)
- Sử dụng server component và client component đúng mục đích (`'use client'`)
- Hỗ trợ tốt cho SSR, streaming, nested layout.

### 5. Mẫu axios instance
```ts
// services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export default axiosInstance;
```

### 6. Sử dụng Material UI
- Tạo file `theme/theme.ts` để custom theme.
- Bọc app bằng `<ThemeProvider>` trong `app/layout.tsx`.

### 7. Best practice
- Tách biệt rõ server component và client component.
- Đặt tên folder, file nhất quán (kebab-case hoặc camelCase).
- Tổ chức module theo business domain trong `app/`.
- Sử dụng hooks cho logic tái sử dụng.
- Đặt schema validate (nếu có) vào `utils/` hoặc `schemas/`.

### 8. Tham khảo
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
