# 带文件名运行 npm run lint 仍然会 lint 整个 src
`npm run lint -- BuildingChangeDialog.vue` 实际上会对整个 `src` 目录执行 lint（约 19k 警告），对单个文件运行 `npx eslint --no-fix` 结果为 0 错误，15 个警告。

## 行为
- `npm run lint -- BuildingChangeDialog.vue` 会 lint 整个 `src`（≈19k 警告）
- 对单个文件运行 `npx eslint --no-fix`：0 错误，15 警告（`prefer-zs-components`：建议使用 `zs-form-item`/`zs-select` 替代 `el-form-item`/`el-select`），与 NodeDetailsDialog 和 PaymentBuildingDialog 一致，并非由此变更引入

## 修正建议
- 在合并前，修改 `BuildingChangeDialog.vue` 中 `el-option` 上的 `v-money:2` 以及 `el-select` 的 `disabled` 条件
- ESLint 未覆盖这两点

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/064.md; src=苏州市房地产监测V3/264.md
- 涉及文件: BuildingChangeDialog.vue, NodeDetailsDialog.vue, PaymentBuildingDialog.vue, zs-dialog.vue, RealEstateDialog.vue
- 所属项目: 苏州市房地产监测V3; 会话: 7123fc41-c4b5-4ca1-afc5-aec23b0dd06d; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lint_full_src",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 2,
  "memory_type": "entities"
}
-->