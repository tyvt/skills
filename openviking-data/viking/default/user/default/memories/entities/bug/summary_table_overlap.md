# Flood Inspection Summary Table Frozen Column Scroll Overlap Fix (Bug 6435)
Bug 6435 in zhi2-web-admin (Su Housing frontend) fixed the issue where two frozen columns of the pre-flood inspection summary table overlapped with scrolling column text during horizontal scroll.

## Root Cause
- Global `src/styles/element-ui.scss` sets `.el-table`/`tr` to `transparent`
- The summary table renders inside `Headline`'s `.sub-container`, not inside `.list-card`/`.zs-table-container`
- Fixed column layers (`.el-table__fixed` etc.) lacked an opaque background, so scrolling content showed through and overlapped frozen columns
- List-page tables inside `.list-card` are covered by existing rules; this table was missed

## Fix
- Added `class="summary-table"` to the summary `el-table` in `src/views/flood/inspection/detail.vue`
- Used the file's existing `>>>` deep selector to give fixed column layers (header/total row/body cells) a white opaque background covering scrolling content
- Header keeps `#fafafa` (inline priority), body set to white for consistency; only affects this table, global transparent rule unchanged

## Verification
- ESLint: `node .../eslint.js src/views/flood/inspection/detail.vue --ext .vue` → exit 0
- Build: `npm test` (Vite test build) → exit 0, built in 2m 28s, 5675 modules transformed
- Log: added `E25` entry + 2026-11-11 record in `docs/flood/common-errors.md`
- Not executed: real-account browser visual regression for scroll occlusion (no login state); 1366 narrow-screen visual regression
- Suggestion: manually verify scroll occlusion in a logged-in test environment and complete the 1366 narrow-screen regression

## Commits and ZenTao Write-back
- Submodule `zhi2-web-admin`: `57a2b5e95` (branch `develop/v2.6.2-suzhufang-li`), pushed
- Parent repo gitlink: updated to `57a2b5e95`, commit `cb9860e` pushed (main submodule checkout stayed on `fix/bug6369-*` branch, not switched, only parent reference updated)
- ZenTao bug 6435: status=resolved / resolution=fixed / resolvedBy=tiany / assignedTo=lichandan, write-back time 2026-11-11 13:20:39, with root-cause+fix+verification comment

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "summary_table_overlap",
  "source_extraction_id": "b4aedf95070e4fcd87883057eae14e29",
  "version": 1,
  "memory_type": "entities"
}
-->