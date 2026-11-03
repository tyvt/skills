# Unit List Dict Misuse
苏州市房地产监测V3 unit list "有无电梯" column wrongly used `sys_include` dictionary, showing raw value 0.

## Problem
- Original "有无电梯" (elevator or not) column used `sys_include` dictionary with no matching value, showing raw value 0
- Affected three views: projectManagement/unitinfo/index.vue, building/unit/index.vue, building/unitChange/index.vue

## Solution
- Switch all three views to use `have_or_not` dictionary from `permitConstants.js` `PLAN_DICT_TYPES.HAVE_OR_NOT`
- If numbers still show, confirm `have_or_not` dictValue in dict management matches interface return value

## Files and Attribution
- Verification: src=苏州市房地产监测V3-leftover/124.md
- Involved files: projectManagement/unitinfo/index.vue, building/unit/index.vue, building/unitChange/index.vue, projectManagement/unitinfo/detail.vue, presale/permit/permitConstants.js
- Project: 苏州市房地产监测V3; source session: 4676abc6-8d97-4393-94eb-00860b189dc6; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "unit_dict_misuse",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 1,
  "memory_type": "entities"
}
-->