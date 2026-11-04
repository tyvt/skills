# Unregistered local page jump causes navigateTo failure
houseLoanGuide/index.vue jumped to an unregistered page pages/policy/fddydetail (not in pages.json), causing navigateTo:fail page not found.

## Problem
- houseLoanGuide/index.vue navigated to pages/policy/fddydetail missing from pages.json
- Triggered navigateTo:fail page not found error

## Solution
- Open the external H5 page via webViewNav instead of navigateTo
- Implemented in zhi2-mobile-shimin/src/pages_transaction/houseLoanGuide/index.vue goToDetail method

## Verification
- Verification: src=苏住房C/068.md
- Files: houseLoanGuide/index.vue, pages.json, transaction.js, webViewNav.vue, bankList.vue, bankDetail.vue, taxGuide/index.vue, utils/index.js
- Source session: 2d03bb3e-84c4-4246-ae8a-bea874fd391d

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "unregistered_navigate_fail",
  "source_extraction_id": "6a5f40753ef0432f99d9c80a416f56e7",
  "version": 1,
  "memory_type": "entities"
}
-->