# Public Portal E2E Test
Playwright e2e setup for the zhi2-web-admin public portal (门户) deployment served on nginx port 8092.

## Config
- `playwright.public-portal.config.ts` matches `public-portal*.spec.ts` (includes `public-portal-skeleton.spec.ts`).
- Uses `PLAYWRIGHT_BASE_URL` as `baseURL`; starts a dev `webServer` only when `PLAYWRIGHT_BASE_URL` is unset, so it runs directly against the nginx deployment.
- Playwright browsers are installed; no dev server needed when `PLAYWRIGHT_BASE_URL=http://localhost:8092`.

## Mock Data Requirement
- `package.json` `test` script builds with `--mode test`; the suite expects a `test`-mode build with mock data baked in via `installPublicPortalMocks` (local mock, synchronous rendering).
- `installPublicPortalMocks` intercepts ALL `/api/v3.0/**` and `/api/v2.0/**` endpoints and returns `rows: []` (observed 2026-11-09); `PropertyPages.vue` renders `<PortalTable v-if="tableRows.length">`, so empty rows → no table rendered in test env for projects/permits/notices/brokers/rental-credit.
- `VITE_APP_BASE_API` is **not** set in any `.env*` file (observed 2026-11-09), so in the built bundle `baseURL` is `undefined` and calls go to relative `/portal/public/...` paths; `getPortalProjects` → `POST /api/v3.0/portal/public/property/project/page`, no mode gating; table depends entirely on API response, not bundled mock fallback.
- Contract test (`public-portal-skeleton.spec.ts`) passed: only checks form + skeleton, not data rows; "no full-page skeleton on direct load" assertions (lines 31–32) passed; screenshot shows real page rendered with search bar.
- Two table-row tests fail (projects / permits / notices / brokers / rental-credit assertions) while contract test passes — environmental mismatch from empty mock rows, not a code defect; `loadRows()→getPortalProjects` is unchanged from base branch, so tables are empty with or without the skeleton change (observed 2026-11-09).
- The fixture `.ts` is a pixel-comparison helper; `installPublicPortalMocks` is defined in its pruned middle. Test comment claims "data from local mock" but implementation actually calls the API; user decided to keep the e2e test as-is (保持现状) on 2026-11-09.

<!-- MEMORY_FIELDS
{
  "category": "e2e_config",
  "name": "public_portal_e2e",
  "source_extraction_id": "8595218b1fe14e71800efda5ddaff666",
  "version": 3,
  "memory_type": "entities"
}
-->