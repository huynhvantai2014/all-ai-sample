# Copilot Instructions for all-ai HR Management System

## Big Picture Architecture
- This is a Next.js 16 (App Router) fullstack HR management system using Material UI, MongoDB (via Mongoose), and JWT authentication.
- Source code follows Japanese SI documentation patterns with comprehensive design documents in `docs/` directory.
- Frontend screens are in `src/app/` (e.g., `employees`, `login`, `dashboard`) as standalone React components.
- Backend APIs in `src/app/api/` provide real MongoDB integration with proper authentication and authorization.
- Authentication uses JWT tokens stored in localStorage with role-based access control.

## Developer Workflows
- **Development:** Use `npm run dev` to start local server with Turbopack
- **Database:** Use `npm run seed` to populate MongoDB with test data
- **Login:** Test with `admin/123456` for full access
- **Documentation:** All specs follow IPA (Information-technology Promotion Agency) Japanese standards in `docs/`
- **Code Generation:** Use design documents in `docs/03_画面系/` to generate screens and APIs

## Project-Specific Patterns
- **Documentation-Driven:** Every screen has detailed specs in `docs/03_画面系/<画面論理名>/画面定義書.md`
- **Japanese Naming:** Use Japanese logical names for folders (e.g., `社員一覧・検索画面`) following `docs/00_intructions/00_naming_and_structure_reference.md`
- **Client Components:** All interactive React components must start with `'use client'`
- **Authentication Flow:** Check `localStorage.getItem('token')` and redirect to `/login` if missing
- **API Standards:** All APIs follow consistent error codes (E001-E999) and response format patterns
- **Emotion SSR:** Handle hydration mismatches with `ClientOnly` wrapper and emotion cache

## Integration Points
- **Authentication:** JWT tokens with Bearer authentication in API headers
- **Database:** MongoDB with Mongoose ODM, models in `src/models/`
- **UI Framework:** Material UI v5 with blue primary theme
- **Form Handling:** React Hook Form with Yup validation
- **Data Fetching:** Native fetch API with consistent error handling

## Documentation Templates
- **Screen Specs:** Use `docs/01_templates/画面定義書_Template.md` for new screens
- **API Specs:** Use `docs/01_templates/API定義書_Template.md` for new endpoints
- **Naming Rules:** Follow `docs/00_intructions/00_naming_and_structure_reference.md` strictly

## Key Files & Directories
- `src/app/` — Screen components and API routes
- `src/models/` — Mongoose schemas (Employee, User, Resource)
- `src/components/` — Shared components (MuiRootProvider, AuthGuard, ClientOnly)
- `docs/03_画面系/` — Complete screen specifications with API definitions
- `docs/00_intructions/` — Development process and naming conventions
- `lib/mongodb.ts` — Database connection singleton

## Examples
- **New Screen:** Create `docs/03_画面系/<画面名>/画面定義書.md` first, then implement `src/app/<screen>/page.tsx`
- **New API:** Follow pattern in `src/app/api/employee/search/route.ts` with proper error handling
- **Authentication:** Copy auth check pattern from existing screens: `const token = localStorage.getItem('token'); if (!token) router.push('/login');`

---

For domain-specific patterns or Japanese documentation standards, refer to the comprehensive specs in `docs/` directory.
