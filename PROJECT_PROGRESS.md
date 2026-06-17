# Maison Arc Project Progress

## Current Status

Maison Arc is a React + Vite + TypeScript single-page storefront prototype for a luxury made-to-order footwear brand. The frontend architecture is now established, the main customer-facing routes are implemented, a protected client-area authentication prototype is in place, and a full application architecture package has been created for the future backend, database, authentication, caching, deployment, and security design.

The running application is still frontend-only today and continues to use local static/mock data for products, journal content, saved designs, cart, checkout, and order flow. Authentication currently uses a localStorage-backed demo session rather than a backend identity service.

## Implemented Routes

- `/` - Home page with hero, product preview, and primary configuration CTA.
- `/collection` - Product collection grid with category filtering.
- `/collection/:modelId` - Product detail and per-product configuration page.
- `/configure` - Multi-step standalone configurator wizard.
- `/atelier` - Editorial atelier/process/materials page.
- `/journal` - Journal index page.
- `/journal/:articleId` - Journal article detail page.
- `/about` - Brand/house overview page.
- `/lookbook` - Lookbook page using existing product imagery and collection links.
- `/login` - Client sign-in page for protected account and order routes.
- `/my-designs` - Saved commission drafts page using mock saved configurations.
- `/account` - Protected account overview page using authenticated client profile data.
- `/cart` - Protected cart page for commission review using mock order data.
- `/checkout` - Protected checkout page for customer, delivery, and deposit review using mock order data.
- `/order-confirmation` - Protected submitted commission confirmation page and atelier review handoff.
- `/shared-design` - Shared design preview fallback route.
- `/shared-design/:shareId` - Public shared design preview route.
- `*` - Not-found page for unknown client routes.

## Recent Work Completed

- Built Journal index page and article detail flow.
- Built About page and matched its heading format to the Atelier style.
- Built Lookbook page and connected the existing homepage `/lookbook` link.
- Built My Designs page and connected the existing navbar `/my-designs` link.
- Built Account page and added Account links to desktop and mobile navigation.
- Built Cart, Checkout, and Order Confirmation pages for the commission flow.
- Built Shared Design preview route and linked it from My Designs.
- Built NotFound page and added a wildcard route.
- Standardized page headings to use the existing pattern: base heading plus accented `<em>` descriptor with an em dash.
- Added route scroll restoration and improved page-level metadata handling.
- Centralized duplicated mock order data into `src/data/mockOrder.ts`.
- Implemented frontend authentication with:
  - `src/auth/AuthContext.tsx`
  - `src/auth/ProtectedRoute.tsx`
  - `src/app/pages/LoginPage.tsx`
- Wrapped private routes with route protection and added redirect-to-login behavior.
- Updated navbar account controls to reflect signed-in and signed-out states.
- Connected Account page profile details to authenticated user state.
- Designed the full application architecture and added deliverables:
  - `APPLICATION_ARCHITECTURE.md`
  - `docs/architecture/database-schema.sql`
  - `docs/architecture/openapi.yaml`
  - `docs/architecture/decisions.md`

## Reused Components

- `Navbar`
- `FooterStrip`
- `Button`
- `SeriesLabel`
- `BulletList`
- `ProductHeroImage`
- `usePageTitle`
- Static product/configurator/order data from `src/data`

## Verification

The project has been repeatedly verified with:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

The build succeeds when run unrestricted. Normal sandboxed runs may fail at Vite config resolution with:

```text
Cannot read directory "..": Access is denied.
Could not resolve "C:\Users\dotmactech\Maison\vite.config.ts"
```

This is an environment permission issue, not a TypeScript/app compile issue.

## Known Limitations

- No backend implementation exists yet; only the application architecture package has been designed.
- No backend authentication, token/session API, payment integration, or persistent database-backed API exists yet.
- Authentication is a frontend-only demo flow backed by localStorage and seeded credentials.
- My Designs, cart, checkout, and order data are still mock/static.
- Some older source strings still contain mojibake from previous encoding issues, especially arrows, bullets, and em dashes in pre-existing files.
- Product imagery is reused across most products.
- Navbar still contains primary navigation only; Account and My Designs are utility links.
- `npm run lint` currently resolves to TypeScript typecheck, not a full ESLint setup.

## Suggested Next Work

- Scaffold the backend from the approved architecture package.
- Replace the local demo auth layer with real backend identity, session/token handling, and protected APIs.
- Add Postgres, Redis, and the first API slice for saved designs and cart.
- Add persistent saved designs, cart, and account state.
- Add a real order submission flow backed by checkout and atelier-review APIs.
- Clean mojibake/encoding artifacts across source files.
- Add basic smoke tests for all routes.
- Add real linting/CI checks.
- Replace repeated mock product imagery with distinct product assets.
