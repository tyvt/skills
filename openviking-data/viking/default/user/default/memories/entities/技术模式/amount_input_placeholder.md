# 金额输入未配占位符致提示遗漏
`AmountInput` 仅做 `$attrs` 透传，未传 `placeholder` 时不显示提示，宗地弹窗土地面积项遗漏，已通过脚本扫描补齐。

## 问题根因
- `AmountInput` 组件仅透传 `$attrs`，未主动设置 `placeholder`
- 未传 `placeholder` 时界面不显示输入提示
- 宗地弹窗 `ParcelDialog.vue` 土地面积项遗漏提示

## 修复方案
- 新增 `scripts/check-amount-input-placeholder.mjs` 扫描可编辑 `amount-input`（排除 `disabled`/`readonly`，保留 `:disabled="条件"`）
- 按 `placeholder="请输入{label}"` 规则补齐 45 处
- 接入 `npm run lint` 保证后续规范

## 涉及文件
- d:/repository/苏州市房地产监测V3/package.json
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelDialog.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelTable.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/detail-template/detail-template.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-form/zs-form.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/presale/cashsale-apply-detail-layout.spec.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/020.md
- 来源会话ID：6b280839-f450-444e-b4d9-5cb55916b900
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_input_placeholder",
  "source_extraction_id": "2ff3eb53a9534d35a8a41e56fd95e4fb",
  "version": 1,
  "memory_type": "entities"
}
-->