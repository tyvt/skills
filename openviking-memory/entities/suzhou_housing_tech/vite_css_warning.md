# Vite config and CSS nesting build warnings
The zhi2-mobile-shimin project had build warnings from duplicate vite sourcemap keys, CSS nesting, and local SVG paths; fixes eliminated warnings.
## Root cause
- vite.config.ts had duplicate sourcemap key; changed to unified platform-based condition.
- PropertyCard.vue and other Vue files used CSS nesting; expanded to full selectors for Chrome 53 compatibility.
- flag-szf.svg in ResultStatistics.vue and StepConfirm.vue used local path; switched to CDN URL.
- browserslist db was stale; ran `npx update-browserslist-db`.
## Solution
- Unified vite sourcemap config by platform.
- Rewrote nested CSS as explicit selectors in PropertyCard.vue, property-detail.vue, company-detail.vue, data-analysis.vue.
- Replaced local svg with CDN in ResultStatistics.vue, StepConfirm.vue.
- Updated browserslist database.
## Verification
- Source: session 5ca7c165-a429-40a7-a5eb-a5c94b398242; baseline none; from 苏住房C/062.md.
- Involved files: vite.config.ts, index.html, src/page-query/data-analysis.vue, PropertyCard.vue, property-detail.vue, company-detail.vue, ResultStatistics.vue, StepConfirm.vue.

<!-- MEMORY_FIELDS
{
  "category": "suzhou_housing_tech",
  "name": "vite_css_warning",
  "source_extraction_id": "bf93ed7583b04cdc899775f3a7eb2b15",
  "version": 1,
  "memory_type": "entities"
}
-->