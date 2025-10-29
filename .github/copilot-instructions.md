# Copilot Instructions for all-ai POS Demo Codebase

## Big Picture Architecture
- This is a Next.js 16 (App Router) fullstack POS demo using Material UI and MongoDB (via mongoose).
- Source code is organized by physical screen names (not screen IDs) under `src/app/` (e.g. `login`, `provisional_order`, `checkout`, etc.).
- API routes are in `src/app/api/` and use mock data for demo purposes.
- Each screen is a standalone React component, often using Material UI for layout and controls.
- Authentication is mocked via localStorage (`pos_logged_in`).

## Developer Workflows
- **Development:** Use `npm run dev` to start the local server (Turbopack).
- **Build:** Use `npm run build` for production builds.
- **API Mocking:** Most API endpoints (e.g. `/api/items`, `/api/provisional-orders`) return hardcoded mock data for demo/testing.
- **Login:** Use userId=`admin`, password=`123456` for mock login.
- **Screen Navigation:** Use Next.js `<Link>` (no legacyBehavior) for navigation between screens.

## Project-Specific Patterns
- **Screen Naming:** All screens and mock files use physical names (e.g. `login.html`, `provisional_order.html`) for clarity and demo alignment.
- **UI Consistency:** Main color is standardized (`#1976d2`). Layout and spacing follow Material UI defaults, but can be adjusted to match mock HTML/CSS.
- **Client Components:** All screens using React hooks (`useEffect`, etc.) must have `'use client'` at the top.
- **Authentication Guard:** Home screen and protected screens auto-redirect to `/login` if not authenticated.
- **Mock Data:** API routes in `src/app/api/` are designed for easy extension; update mock arrays to change demo data.

## Integration Points
- **Material UI:** Used for all UI components; theme is set in a client-only provider (`MuiRootProvider`).
- **Emotion:** SSR is partially supported; style FART may occur due to Next.js 16 limitations.
- **MongoDB:** Mongoose is installed but not used in mock APIs; real DB integration can be added in `src/app/api/`.

## Examples
- To add a new screen, create a folder under `src/app/` (e.g. `sales_report`) and add a `page.tsx` with `'use client'` and Material UI components.
- To update mock data, edit the relevant API route file (e.g. `src/app/api/items/route.ts`).
- To match UI with mock HTML, refer to `docs/mock/*.html` and adjust Material UI props/styles accordingly.

## Key Files & Directories
- `src/app/` — Main screens and pages
- `src/app/api/` — API routes (mocked)
- `src/components/` — Shared React components (e.g. `MuiRootProvider`, `AuthGuard`)
- `docs/mock/` — HTML/CSS mockups for demo reference
- `docs/gen_process_jp.md` — Japanese SI process and AI usage documentation

---

For any unclear conventions or missing patterns, please ask for clarification or provide feedback to improve these instructions.
