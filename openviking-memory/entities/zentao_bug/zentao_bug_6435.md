# ZenTao Bug 6435
ZenTao defect 6435: flood inspection detail page default-date, column-freeze and date-column cleanup fix, resolved via DBX transactional write-back on 2026-11-10.

## Description
- Module: flood inspection detail page (src/views/flood/inspection/detail.vue in zhi2-web-admin submodule).
- Worktree: worktrees/bug5897, branch develop/v2.6.2-suzhufang-li.

## Code Fix
- Check date defaults to today + auto stats: resetSummary summaryBegin/summaryEnd changed from null to this.today(); load() auto calls loadSummary() when showSummary.
- First two columns frozen: 序号 and 行政区域/社区 columns set fixed for horizontal scroll orientation.
- Removed redundant date column: deleted static "日期" column (prop=checkDate) since data is same-day stats.
- Total row sync: summaryMethod fixed segment reduced from 4 items to 3 (['合计','', total.patrolPersonNum]).

## Docs and Verification
- docs/flood/common-errors.md added entry E24 (table row + detail) for root cause: default date + freeze columns + remove date column.
- Project rule: every flood page modification must update docs/flood/common-errors.md.
- ESLint on detail.vue exit 0; npm test (Vite build) exit 0.
- Not executed (no login/fixture): real-account summary integration, 1366px visual regression — recorded for customer-test confirmation.

## Resolution
- Submodule zhi2-web-admin: 1e4f697cd (code) + 4d0aa574a (ledger) → origin/develop/v2.6.2-suzhufang-li.
- Parent repo pointer: 84bebc1 → origin/develop/v2.6.2-suzhufang-li.
- DBX transactional UPDATE zt_bug status=resolved/resolution=fixed/resolvedBy=tiany/assignedTo=lichandan (returned to reporter); INSERT zt_action id 90473 (resolved, extra=fixed, vision=rnd); committed and post-commit verified on 2026-11-10.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6435",
  "source_extraction_id": "2a455c504eb0491c9e3a7a83d8628f35",
  "version": 1,
  "memory_type": "entities"
}
-->