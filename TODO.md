# TODO

## High Priority Bugs

- [ ] Fix mojibake/encoding artifacts across the source.
  - Many pre-existing strings render as corrupted characters in source, especially arrows, em dashes, bullets, multiplication signs, check marks, and section-divider comments.
  - Examples appear in `ConfiguratorPage.tsx`, `ProductPage.tsx`, `Navbar.tsx`, `ProductCard.tsx`, `FooterStrip.tsx`, and several data files.

- [ ] Add a real `/size-guide` route or remove the link.
  - `SizeSelector` links to `/size-guide`, but no route exists in `App.tsx`.
  - Current behavior will leave users on an unhandled client route.

- [ ] Preserve product-page configuration when entering the standalone configurator.
  - Product detail pages let users choose material, color, sole, lining, hardware, lace, monogram, and size.
  - The `Begin Order` link only passes `?model=...`, so the standalone configurator resets all other choices to `DEFAULT_CONFIG`.

- [ ] Decide how sold-out/archive products should behave in all flows.
  - `ProductPage` blocks sold-out products, while `ModelPicker` excludes only products with `badge === 'Sold Out'`.
  - Archive products without a sold-out badge may still appear as configurable even when `configurableOptions` is `0`.

## Missing Product Features

- [ ] Replace the local demo auth flow with real backend authentication.
  - Auth now exists only as a frontend-only prototype using localStorage-backed session state and seeded demo credentials.
  - The app still needs real user records, passwordless/password auth strategy, secure token or cookie sessions, logout invalidation, and server-side authorization.

- [ ] Add account registration, recovery, and session lifecycle UX.
  - There is no sign-up, password reset, magic-link flow, session expiry handling, multi-device session management, or account recovery path.
  - Login currently only supports a seeded demo client account.

- [ ] Add persistence for saved designs.
  - `/my-designs` uses hardcoded `SAVED_DESIGNS`.
  - There is no local storage, backend storage, create/update/delete flow, or link from the configurator to save a design.

- [ ] Add a real order/commission submission flow.
  - `ConfiguratorPage` only toggles local `submitted` state.
  - There is no API request, order ID, confirmation email, payment step, review queue, or recovery after refresh.

- [ ] Add cart/checkout or commission deposit flow.
  - Pricing is displayed, but there is no cart, checkout, deposit, tax/shipping calculation, or payment provider integration.

- [ ] Add account editing actions.
  - Account page buttons such as `Review sizing`, `Update contact`, and `View aftercare` are static buttons with no behavior.
  - Profile fields are read-only and only partially connected to auth state.

- [ ] Add service/aftercare history.
  - Account page mentions service credits and aftercare, but there is no completed-pair history or service request workflow.

- [ ] Add product inventory/state modeling.
  - Availability is currently inferred from string badges such as `Sold Out`, `Last 12`, and `Limited`.
  - Inventory, limited quantity, archive status, and configurability should be explicit product fields.

- [ ] Add distinct product imagery.
  - Most product records reuse `/shoes/upscaled_transparent.png`.
  - Collection, Lookbook, My Designs, and configurator pages would benefit from per-model assets.

- [ ] Add journal/article management source.
  - Journal articles are hardcoded in `src/data/journal.ts`.
  - A future CMS, markdown pipeline, or structured content source would make article updates safer.

- [ ] Add search, sort, and richer filtering to the collection.
  - Collection currently filters only by category.
  - Useful missing controls include price range, availability, product type, limited/archive status, and sort order.

- [ ] Add a real lookbook content model.
  - Lookbook content is hardcoded inside `LookbookPage.tsx`.
  - Consider moving frames and editorial rules into data files if this grows.

## UX and Accessibility Improvements

- [ ] Improve unavailable route handling in navigation and CTAs.
  - Ensure every link in nav, CTAs, and inline controls points to a valid route.
  - Current known missing route: `/size-guide`.

- [ ] Add loading fallbacks for lazy routes.
  - `App.tsx` uses `Suspense fallback={null}`.
  - Slow networks show a blank area while chunks load.

- [ ] Add error boundaries for route-level failures.
  - Runtime errors in lazy pages/components will crash the app without a user-friendly recovery state.

- [ ] Improve configurator persistence across refresh/back navigation.
  - Step, selected model, and configuration are local component state only.
  - Refreshing or leaving the flow loses progress.

- [ ] Make saved design actions reflect their actual behavior.
  - My Designs `Edit Design` links to the product page with defaults, not the saved design's actual configuration.
  - Either hydrate the saved config into the configurator or rename the action.

- [ ] Review decorative/interactive product image accessibility.
  - `ProductHeroImage` can be decorative in some pages and informational in others.
  - Confirm `aria-hidden`, `alt`, and drag affordance behavior are correct for each usage.

- [ ] Add reduced-motion handling for product rotation and page animations.
  - `ProductHeroImage` runs hint animation on mount.
  - Respect `prefers-reduced-motion` for users who opt out of motion.

## Technical Debt

- [ ] Extract repeated page-header patterns.
  - Journal, About, My Designs, Account, Atelier, and Lookbook repeat similar header markup/CSS.
  - A shared page header component would reduce drift in heading, breadcrumb, and accent formatting.

- [ ] Extract repeated editorial/card layouts.
  - Several pages duplicate section labels, card grids, CTA blocks, and stat cards.
  - Shared components should be introduced only once the patterns stabilize.

- [ ] Move mock data out of page components.
  - `AccountPage`, `MyDesignsPage`, `LookbookPage`, and `LoginPage` contain local arrays/content constants.
  - Moving them to `src/data` would make the prototype easier to maintain.

- [ ] Replace badge-string logic with typed fields.
  - Multiple components compare `product.badge` to strings or prefixes.
  - Add typed fields such as `availability`, `isLimited`, `inventoryCount`, and `isConfigurable`.

- [ ] Normalize text encoding and enforce UTF-8.
  - Add editor/config guidance after cleaning mojibake so corrupted characters are not reintroduced.

- [ ] Add route smoke tests.
  - There are no tests covering page rendering or route availability.
  - Minimum useful coverage: each route renders a heading and every internal link points to an implemented route.

- [ ] Add configurator behavior tests.
  - Cover model selection, required size gating, price calculation, monogram pricing, and submit confirmation.

- [ ] Add CI checks.
  - No CI configuration is present.
  - Build, lint, and route smoke tests should run automatically.

- [ ] Add real ESLint setup.
  - `lint` currently maps to TypeScript typecheck only.
  - Add ESLint configuration, React/TypeScript rules, and wire it into CI.

## Build and Environment Notes

- [ ] Document the PowerShell `npm.ps1` execution policy workaround.
  - `npm run ...` may fail in PowerShell because scripts are disabled.
  - `npm.cmd run ...` works in this environment.

- [ ] Document sandbox-specific Vite config resolution issue.
  - Sandboxed builds may fail with `Cannot read directory "..": Access is denied` and `Could not resolve vite.config.ts`.
  - Unrestricted `npm.cmd run build` succeeds.
