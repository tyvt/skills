# Singleton config page no id skips mixin request
platformConfig/detail.vue route has no id, triggering mixins/form.js getDetail() id-empty check that skipped the /system/platformConfig/getInfo request, leaving the form empty.

## Root cause
- platformConfig/detail.vue route carries no id param
- mixins/form.js getDetail() validates id and skips the API call when id is empty, so getInfo never fires

## Solution
- Overrode getDetailRequiredParams() in the page methods to return {} to bypass the id-required check
- This lets the page call /system/platformConfig/getInfo normally and backfill the form
- Related files: detailMixins.js, form.js

## Verification and source
- Verified in src=无锡市区G/004.md
- Project: zhi2-web-admin (无锡市区G); source session: ab2855cc-75e4-4430-85d8-acdddf2c429b; code base: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "singleton_config_no_id",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 1,
  "memory_type": "entities"
}
-->