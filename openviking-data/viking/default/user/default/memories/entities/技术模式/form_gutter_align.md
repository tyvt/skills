# 表单项要求 gutter 和 label-width 对齐
在 苏州市房地产监测V3 项目中，`template/detail.vue` 接收 `:gutter="24"` 和 `label-width="140px"`；所有的 `el-col` 都位于 `<el-row :gutter="24">` 内部，以对齐 `versionManagement/detail.vue` 的三列布局。

## 实现
- `template/detail.vue` 中的外部容器 `detail-from-container` 接收 `:gutter="24"`
- `label-width` 定义为 `140px`
- 所有 `el-col` 都被 `<el-row :gutter="24">` 包裹
- 目标：对齐 `versionManagement/detail.vue` 的三列布局

## 验证与归属
- 验证证据: extracted source=cursor session=296f20bf-9014-411d-b3b7-10c9a3853b30
- 涉及文件: commercialHousingSales/presale/template/detail.vue, versionManagement/detail.vue, contractRevoke/detail.vue, projectManagement/buildinginfo/detail.vue, e2e/fixtures/contract-template-menu-config.js, vite.config.js, 路由信息.json, e2e/fixtures/contract-template-helpers.js
- 所属项目: 苏州市房地产监测V3; 会话: 296f20bf-9014-411d-b3b7-10c9a3853b30; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_gutter_align",
  "source_extraction_id": "6433a7001a3e48e3b87e2ed8833cfa99",
  "version": 1,
  "memory_type": "entities"
}
-->