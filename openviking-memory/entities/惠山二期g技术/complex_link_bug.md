# 用户统计中跳转到项目详情的链接问题
列“物业管理区域”原本是文本，不会跳转到项目详情，已修正为链接。

## 问题
- 在 zhi2-web-admin/src/views/property/userStatistics/index.vue 中，“物业管理区域”列 (complexName) 原为 text 类型。
- 触发跳转时缺少 projectId，导致无效参数警告。

## 解决方案
- 在 vue 中导入 getRouterPathByFilePath。
- complexName 改为 type:'link'，触发 handleViewProject。
- 使用 projectId 和 query formMode:'view' 打开 building/project/detail。
- 如果缺少 projectId，显示无效参数警告。

## 验证与归属
- 验证证据: cursor session 00d6a1e4-2062-4ab5-8de7-905e9b2376e6
- 文件: zhi2-web-admin/package.json, zhi2-web-admin/src/views/property/userStatistics/index.vue, zhi2-web-admin/src/views/property/ctUserIdentityApply/bindTable.vue, zhi2-web-admin/src/views/property/ctUserIdentityApply/index.vue, zhi2-web-admin/src/views/property/ownerBindQuery/index.vue, zhi2-web-admin/src/views/building/project/index.vue, zhi2-web-admin/src/views/property/complex/components/rangeTable.vue, zhi2-web-admin/src/mixins/listMixins.js
- 所属项目: 惠山二期G

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Huishan Fase 2G",
  "name": "complex_link_bug",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "entities"
}
-->