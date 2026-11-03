# zs-region-select code echo from non-left-tree options
In 苏住房G, zs-region-select's regionOptions come from the platform config areas tree, not the left-tree selected area (e.g. 320505); read-only echo shows the raw code when el-select finds no matching label.

## Problem Background
- regionOptions are sourced from the platform config areas tree and do not include the left-tree selected area code.
- In read-only echo (disabled el-select) with no matching label, the raw area code is shown instead of the name.

## Solution
- Switch to zs-select bound to regionDisplayOptions (built from regionName or allAreas as {dictValue, dictLabel}).
- Render the area name via zs-select in disabled state.

## Verification and Attribution
- Verification: 苏住房G/026.md
- Files: benefit/alert/detailB.vue, company/userManagement/operatorAuth/operatorAuthRangeTable.vue, system/regionBankAuth/detail.vue, system/regionBankAuth/utils.js, system/regionBankAuth/index.vue, mixins/detailMixins.js, mixins/form.js, system/subdistrict/detail.vue
- Project: 苏住房G; Source session: 99982c86-0783-4c2e-a90e-818364f2c016; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_select_code_echo",
  "source_extraction_id": "9d6a5afb1d8e4fd5a2e3955461234a78",
  "version": 1,
  "memory_type": "entities"
}
-->