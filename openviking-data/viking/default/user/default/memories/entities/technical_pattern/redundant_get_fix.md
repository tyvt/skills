# User Add Redundant Get Fix
Redundant GET in user add page caused V3 empty-body POST error; removed and password init adjusted.

## Problem
- system/user/detail.vue in add mode called this.$get('/system/user/') which V3 converted to POST /system/user/add with empty body, causing error

## Fix
- Deleted redundant request and removed unused postOptions
- Password initialization via /system/config/getInitialPassword setting form.password to avoid race condition
- Role list still loaded from /system/role/roles

## Involved Files
- d:/repository/产品2.0/zhi2-web-admin/src/views/system/user/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/fjflpz/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/main.js
- d:/repository/产品2.0/zhi2-web-admin/src/api/index.js
- d:/repository/产品2.0/zhi2-web-admin/src/config/security.js
- d:/repository/产品2.0/zhi2-web-admin/src/utils/request.js

## Verification
- Source: 产品2.0/041.md; session: 4f365506-e3be-4779-92c3-618489cfe3e8

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：4f365506-e3be-4779-92c3-618489cfe3e8


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "redundant_get_fix",
  "source_extraction_id": "a2b1f5e322b549a1ab233d8407f12d44",
  "version": 1,
  "memory_type": "entities"
}
-->
