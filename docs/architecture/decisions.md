# Maison Arc Technical Decisions

## ADR-001: Use a modular monolith, not microservices

Decision:

- Build one backend application with strong internal domain modules.

Rationale:

- Product scope is cohesive.
- Team and product are early stage.
- Operational simplicity is more valuable than service isolation.
- Future extraction remains possible if scale demands it.

## ADR-002: Use PostgreSQL as system of record

Decision:

- Use PostgreSQL for all transactional business data.

Rationale:

- Orders, carts, designs, users, addresses, and atelier review are relational.
- JSONB supports flexible design configuration snapshots.
- Strong transactional guarantees are required for checkout/order workflows.

## ADR-003: Use Redis for sessions, queue, and cache

Decision:

- Use Redis as the shared runtime acceleration layer.

Rationale:

- One operational dependency can cover cache, sessions, job queue, and rate limiting.
- It supports low-latency customer workflows and staff tooling.

## ADR-004: Use cookie-based server sessions for customers

Decision:

- Use opaque session cookies instead of JWT-only browser auth.

Rationale:

- Simpler revocation
- Better operational control
- Lower frontend token-handling risk
- Better fit for a web-first luxury commerce experience

## ADR-005: Use passwordless customer auth first

Decision:

- Start with email magic links for customers.

Rationale:

- Lower friction for infrequent luxury purchases
- Less password-reset overhead
- Easier onboarding for shared-design and saved-design flows

Future:

- Add passkeys when repeat customer usage justifies it.

## ADR-006: Separate staff authentication path

Decision:

- Staff auth must be isolated from customer auth and require stronger controls.

Rationale:

- Atelier review, customer notes, and payment workflows require tighter controls.
- Staff actions must be auditable and role-scoped.

## ADR-007: Do not capture payment before atelier approval

Decision:

- Save the payment method during checkout, but capture charge only after atelier approval.

Rationale:

- Product is bespoke and price/timing may change after review.
- Card authorization windows are operationally fragile.
- The business already communicates atelier review before final financial commitment.

## ADR-008: Shared design links must be opaque and revocable

Decision:

- Public shared design URLs must use random tokens, not internal IDs.

Rationale:

- Prevent enumeration
- Support revocation and expiration
- Limit the public projection to safe fields only

## ADR-009: Frontend remains a separate SPA

Decision:

- Keep the existing Vite/React SPA and integrate it with the new API.

Rationale:

- The frontend architecture already exists.
- Replatforming to another frontend stack is not needed to unlock backend capability.

## ADR-010: Prefer managed infrastructure over self-hosted ops

Decision:

- Use managed Postgres, managed Redis, managed email, and managed payment infrastructure.

Rationale:

- Team time should go into product delivery, not platform maintenance.
- Managed services improve operational safety for an early-stage team.
