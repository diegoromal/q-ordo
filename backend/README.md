Q-Ordo
======

Q-Ordo is being built as a platform to manage company onboarding and operations. The first milestone focuses on company registration across the backend and frontend.

Current status
--------------
- NestJS 11 + TypeScript skeleton aligned with Clean Architecture layers.
- Domain layer includes the `Company` aggregate with creation/hydration helpers and Zod-based validation (UUID id, name, CNPJ, CEP, hasContract, timestamps).
- Domain exceptions for validation and generic errors, plus shared utilities for UUID/password hashing and Zod error formatting.
- Jest unit coverage around company creation scenarios.
- HTTP layer currently exposes the default Nest hello route as a placeholder.

Tech stack
----------
- Node.js (LTS) with pnpm
- NestJS 11, TypeScript 5.7
- Jest for tests, ESLint + Prettier for lint/format
- Zod for schema validation
- bcryptjs for password hashing utilities

Getting started
---------------
1. Install dependencies: `pnpm install`
2. Run the dev server: `pnpm start:dev` (set `PORT` to customize, defaults to 3000)
3. Run tests: `pnpm test`
4. Lint: `pnpm lint`
5. Build for production: `pnpm build`

Project structure
-----------------
- `src/main.ts`: Nest bootstrap with configurable port.
- `src/app.module.ts`, `src/app.controller.ts`, `src/app.service.ts`: initial Nest wiring and placeholder hello route.
- `src/domain`: core business code (entities, validators, exceptions, factories).
  - `src/domain/entities/company.entity.ts`: Company aggregate creation and hydration helpers.
  - `src/domain/validators/company.zod.validator.ts`: Zod schema enforcing UUID id, name, CNPJ, CEP, hasContract, timestamps.
  - `src/domain/shared`: base `Entity`, validator interface, domain exceptions.
- `src/shared`: cross-cutting helpers (bcrypt/UUID utilities, Zod error formatter).
- `src/usecases`, `src/infra`: reserved for application and infrastructure layers as features land.
- `test`: Jest setup and upcoming e2e specs.

Near-term roadmap (company registration)
----------------------------------------
- Backend
  - Implement use cases for company creation and listing, reusing domain validation.
  - Define the company repository interface and infrastructure adapter for persistence, then wire them into Nest providers.
  - Expose HTTP endpoints for company operations with DTOs/validation, error mapping, and request logging.
  - Expand automated tests (unit and e2e) covering happy paths, validation failures, and error handling.
- Frontend
  - Build the company registration flow with client-side validation for name, CNPJ, and CEP.
  - Integrate with backend APIs for create/list actions and present clear success/error states.
  - Provide a basic company list/search view to confirm persisted data.
- Cross-cutting
  - Add observability (structured logs/metrics), environment configuration, and CI checks.
  - Document decisions and APIs as they are finalized.

How to contribute
-----------------
- Keep changes small and focused; follow SOLID/Clean Architecture boundaries (domain, use case, infrastructure, interface).
- Add or adjust validations and error handling on new code paths.
- Record notable design choices in `docs/decisoes.md` once the file is added.
