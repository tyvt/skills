# Fj Dialog V3 Adaptation
FjDialog.vue used dialogMixins but old REST endpoints caused wrong addresses; adapted to standard CRUD.

## Problem
- FjDialog.vue used dialogMixins but detail/save still used old REST style (e.g., GET /file/appendixConfig/{id}) leading to wrong request addresses

## Fix
- Refer to ArchiveDetailDialog.vue to add primaryKey, moduleName, businessName to reuse mixin standard CRUD
- Map interface by mode

## Involved Files
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/fjflpz/components/FjDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/fjflpz/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/form.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/dialogMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/archives/components/ArchiveDetailDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/print/components/PrintDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/workflow/components/ConfigDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/archives/index.vue

## Verification
- Source: 产品2.0/041.md; session: 4d504758-e807-4d71-ab92-00820c1154ef

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：4d504758-e807-4d71-ab92-00820c1154ef


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "fj_dialog_fix",
  "source_extraction_id": "a2b1f5e322b549a1ab233d8407f12d44",
  "version": 1,
  "memory_type": "entities"
}
-->
