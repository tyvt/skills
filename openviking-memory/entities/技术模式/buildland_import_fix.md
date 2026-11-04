# Buildland 导入路径修正
`projectManagement/buildland/detail.vue` 的导入路径已修正以通过构建。

## 原因
- 错误的引用 `../project/components/buildingTable.vue` 导致构建失败

## 解决方案
- 更改为 `@/views/building/project/components/buildingTable.vue`，导入支持 `landPlotId` 的组件

## 涉及文件
- `src/views/projectManagement/buildland/detail.vue`
- `src/views/building/project/components/buildingTable.vue`, `package.json`

## 验证与归属
- 验证证据: 提取自 cursor session=a4b83bc3-a943-4439-b513-3c52d63c3302
- 基线: none; 所属项目: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildland_import_fix",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->