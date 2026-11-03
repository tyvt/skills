# Tab Switch Homeowners Info Bug
Kunshan G project bug where switching Tabs rebuilds the page from sessionStorage without re-fetching homeowners committee info, breaking dropdown validation.

## Root Cause
- Tab switch rebuilds the page and restores the form from sessionStorage but does not re-fetch `homeownersassociaInfo`
- Missing data causes validation failure so the organization acceptance unit dropdown cannot be selected

## Fix
- In `init()`, when restoring from sessionStorage and `propertyProjectId` already exists, re-call `getHomeownersassociaInfo`
- Preserve the organization acceptance unit dropdown options 「业委会」(homeowners committee) and 「物管会」(property management committee)

## Verification and Attribution
- Verification: extracted source=cursor session=42c65495-f5cf-48ac-8138-4f4fe0a5e388
- Related files: d:/repository/昆山G/src/views/estate/MaintenanceProject/initiation/detail.vue, d:/repository/昆山G/src/views/estate/MaintenanceProject/apply/detail.vue, d:/repository/昆山G/src/mixins/detailMixins.js, d:/repository/昆山G/src/views/increment/useFund/initiation/detail.vue, d:/repository/昆山G/src/views/repairFunds/usage/fundUsageKs/detail.vue, d:/repository/昆山G/src/views/repairFunds/usage/comprehensiveQuery/components/initiation.vue, d:/repository/昆山G/src/views/repairFunds/usage/fundUsageKs/steps/step1.vue, d:/repository/昆山G/src/api/estate/apply.js
- Project: 昆山G (Kunshan G)
- Source session: 42c65495-f5cf-48ac-8138-4f4fe0a5e388

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "tab_switch_homeowners_bug",
  "source_extraction_id": "5de583db1d61455db6fa97c1988ebf76",
  "version": 1,
  "memory_type": "entities"
}
-->