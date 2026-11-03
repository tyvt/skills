# Presale Plan PDF URL Resolution
In Suzhou Real Estate Monitoring V3, the presale plan PDF must read `planDocSite` to prevent fallback navigation to the plan page.
## Root Cause
- API PDF path is at `data.plan.planDocSite`; old code wrongly read `planUrl` causing fallback to plan page
## Solution
- Added `resolvePlanDocUrl()` in `permitConstants.js` to read `planDocSite`/`planUrl` sequentially
- Called by `handleQueryPlan()` and `canQueryPlan`
- Local 404 requires `/zhi2-dev` proxy config in `vite.config.js`
## Verification
- Evidence: src=苏州市房地产监测V3-rest/050.md
- Files: presale/permit/components/detail.vue, PermitPlanPanel.vue, resolveServerAssetUrl.js, companyApplyAudit/detail.vue, detailMixins.js, form.js
- Source session: 6976122d-456e-461d-a9a7-8ac465dc9b76; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "presale_plan_doc_url",
  "source_extraction_id": "e5022fce1d6e4a71b2e61d2235605578",
  "version": 1,
  "memory_type": "entities"
}
-->