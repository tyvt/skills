# zs-input弹窗选择须带suffix-icon
`zs-input` 带 `@focus` 弹窗选择时必须声明 `suffix-icon="el-icon-search"`，并通过新增 lint 脚本批量补齐图标。

## 规范要求
- `zs-input` 带 `@focus` 弹窗选择时必须声明 `suffix-icon="el-icon-search"`
- 例外：Dialog 内关键字输入、GIS 地图无需声明

## 解决方案
- 新增 `scripts/check-dialog-picker-suffix-icon.mjs` 挂入 `npm run lint` 的 `check:dialog-picker-suffix`
- 批量补齐 56 处图标，`agreementExempt/detail.vue` 等增加 `suffix-icon` 与 `readonly`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/190.md
- 涉及文件：src/views/stock/agreementExempt/detail.vue、src/views/stock/agreement/detail.vue、src/views/stock/account/detail.vue、src/styles/detail-form.scss、src/views/stock/bankConfirm/detail.vue、src/views/stock/comprehensiveQuery/detail.vue、src/styles/element-ui.scss、c:/Users/Administrator/.cursor/plans/监管机构放大镜图标_10a6be04.plan.md
- 来源会话ID：b9e1a88a-1413-48f8-9089-482054877b8a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_suffix",
  "source_extraction_id": "13504b4c3c2241668e70290aac1fe9c5",
  "version": 2,
  "memory_type": "entities"
}
-->