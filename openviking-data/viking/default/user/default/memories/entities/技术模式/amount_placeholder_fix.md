# amount-input placeholder 全局补齐
苏州市房地产监测V3 项目修复 `AmountInput` 未传 placeholder 时不显示的问题，全局补齐 45 处占位文案。

## 根因
- `AmountInput` 只做 `$attrs` 透传，未传 `placeholder` 时不会显示
- 宗地弹窗「土地面积」遗漏，同文件「出让价格」已有 placeholder

## 交付内容
- 检查脚本 `scripts/check-amount-input-placeholder.mjs` 扫描可编辑 `amount-input`（排除 disabled/readonly，仍检查条件禁用但可编辑态），已接入 `npm run lint` 与 `npm run check:amount-input-placeholder`
- 文案补齐原计划 33 处 + 条件禁用但可编辑 12 处，共 45 处，惯例 `placeholder="请输入{表单项 label}"`
- 宗地 `ParcelDialog.vue` 等文件已修复

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：6b280839-f450-444e-b4d9-5cb55916b900；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_placeholder_fix",
  "source_extraction_id": "fd6dce0e4752429b8b3fdac526a80eeb",
  "version": 1,
  "memory_type": "entities"
}
-->