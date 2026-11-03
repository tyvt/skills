# npm run lint 带文件名仍 lint 全 src
`npm run lint -- BuildingChangeDialog.vue` 实际 lint 整个 `src` 目录（约1.9万告警），`npx eslint --no-fix` 单文件检查为 0 error、15 warning。

## 行为说明
- `npm run lint -- BuildingChangeDialog.vue` 实际 lint 整个 `src` 目录（约1.9万告警）
- `npx eslint --no-fix` 单文件检查为 0 error、15 warning（均因 `prefer-zs-components` 惯例，非新引入）

## 修改建议
- 合并前优先修改 `BuildingChangeDialog.vue` 内 `el-option` 的 `v-money:2` 与 `el-select` 的 disabled 条件
- ESLint 未覆盖该两点

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/064.md
- 涉及文件：BuildingChangeDialog.vue、NodeDetailsDialog.vue、PaymentBuildingDialog.vue、zs-dialog.vue、RealEstateDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：7123fc41-c4b5-4ca1-afc5-aec23b0dd06d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lint_full_src",
  "source_extraction_id": "25da285e84a84b788cd24433bceb9002",
  "version": 1,
  "memory_type": "entities"
}
-->