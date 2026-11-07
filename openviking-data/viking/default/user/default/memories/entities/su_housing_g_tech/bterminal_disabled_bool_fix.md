# B端分页接口 disabled 布尔类型修复
苏住房G 中 B 端用户分页接口因 `&&` 短路返回字符串而非布尔值，导致 disabled 类型报错，已修复。

## 问题根因
- `terminalType === 'B' && currentProjectId` 两边为真时返回 `currentProjectId` 字符串（如 `"667570210075104"`）而非 `true`
- 该值传给 `disabled` 造成类型报错与控制台警告

## 修复方案
- 在 `bulkImportDialog.vue` 与 `detail.vue` 改为 `return this.$store.state.user.terminalType === 'B' && !! this.$store.getters.currentProjectId`
- 通过 `!!` 强制转换为布尔值，确保 `disabled` 始终收到布尔类型

## 验证与归属
- 验证：刷新后警告应消失；来源 extracted source=cursor project=苏住房G
- 涉及文件：`zhi2-web-admin/src/views/property/feeDeclare2/components/bulkImportDialog.vue`、`zhi2-web-admin/src/views/property/feeDeclare2/detail.vue`、`zhi2-web-admin/src/views/property/feeDeclare2/index.vue`、`zhi2-web-admin/src/mixins/listMixins.js`、`zhi2-web-admin/src/mixins/table.js`
- 所属项目：苏住房G；来源会话：6628d00f-987f-45b2-80c7-d0bedcc72598

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "bterminal_disabled_bool_fix",
  "source_extraction_id": "199270f6de294f5b977b54d6c702ad55",
  "version": 1,
  "memory_type": "entities"
}
-->