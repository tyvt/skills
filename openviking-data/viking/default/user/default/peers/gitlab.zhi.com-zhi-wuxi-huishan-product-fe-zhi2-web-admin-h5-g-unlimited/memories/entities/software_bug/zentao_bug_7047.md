# ZenTao Bug 7047
ZenTao bug 7047 is a frontend defect in the homeowner account-opening details page where the Add Account Detail dialog has data but its pagination is not visible.

## Description
- Affects zhi2-web-admin-h5 homeowner account-opening details and the Add Account Detail dialog.
- Data rows exist, but no pagination bar is displayed, and resizing does not help.
- Code analysis identified commit 20cf91a66 as the regression point.
- The commit moved `<zs-pagination>` into `.scope-select-table-wrap` and changed `.scope-select-panel` and `.scope-select-table-wrap` from `flex:1; min-height:0` to `flex-shrink:0` with `overflow:hidden`, clipping the pagination.

## Comparison And Fix Pattern
- Bug1929 fix b95646281 is the reference: pagination was a direct panel child and the panel was flexible.
- Candidate fix locations were ScopeSelectDialog.vue or the zs-pagination usage.
- Candidate approaches were adding always-show behavior or correcting the total value or layout.

## Status On 2026-11-27
- The chain id is `bug7047-新增开户明细分页`; hop 2 handed off to hop 3.
- Hop 1 completed DBX lookup, screenshot analysis, login, component localization, and git history comparison; hop 2 did not repeat them.
- Live reproduction with data was not completed because the selected draft nodes returned no loadable houses.
- No production code was changed; hop 3 was scheduled for 2026-11-27 11:57:55 +08:00 as an active new_once job with no stale background job.

## Pending Work
- Find a record with houses or correct checkbox selection so `getTable` returns multiple rows.
- Measure the clipping point, complete the four-part plan, and obtain human confirmation before implementation.
- Pass the frontend verification gate with screenshots, self-check, presentation, embedded evidence, and user confirmation.
- After verification, submit and push, write back to ZenTao as resolved/fixed with screenshots, clear process artifacts, and close the browser session.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "software_bug",
  "name": "zentao_bug_7047",
  "source_extraction_id": "5dd90da273d547a6aafb9c464d021ffb",
  "version": 1,
  "memory_type": "entities"
}
-->