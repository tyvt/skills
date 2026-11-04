# 单价列格式化缺两位小数导致显示不一致
PropertyPages.vue 的 formatUnitPrice 原传入0位小数，导致列表单价无小数及千分位，已统一为两位小数千分位格式。

## 问题背景
- formatUnitPrice 原调用传入 0 位小数，列表单价无小数及千分位，与建筑面积列格式不一致

## 解决方案
- 修改为 formatPortalNumber(value, 2)，以 toLocaleString 输出千分位与两位小数，与建筑面积列对齐
- 导出 CSV 仍写 row.unitPrice 原值，不受格式化影响

## 验证与归属
- 涉及文件：PropertyPages.vue
- 来源会话ID：session_9aa856baf3b1b1c6028c26512bf5a74c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_price_format_fix",
  "source_extraction_id": "6ae3238f0b554c53a5a67bbe5b3718b8",
  "version": 1,
  "memory_type": "entities"
}
-->