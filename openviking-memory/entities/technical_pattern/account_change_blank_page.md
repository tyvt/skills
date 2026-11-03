# Account change button blank page from missing tableid
pubRegulatoryAccount/detail.vue modify() used a named route missing tableid: 'add', jumping to the root path blank page.

## Root cause
- modify() in pubRegulatoryAccount/detail.vue used named-route navigation without tableid: 'add'
- Missing param redirected to root path and rendered a blank page

## Solution
- Replaced with getRouterPathByFilePath from @/utils/ruoyi to build the 'add' path and pass accountId
- pubRegAccountChange/detail.vue getOldDetail() prefills the form from the passed accountId
- Updated permission.js, listMixins.js, ruoyi.js, autonomy/record/components/detail.vue, indemnity/project/index.vue

## Verification and source
- Verified in src=无锡市区G/003.md
- Project: zhi2-web-admin (无锡市区G); source session: be9a1d85-fae7-46fb-9f25-1f3d40a49c4d; code base: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "account_change_blank_page",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 1,
  "memory_type": "entities"
}
-->