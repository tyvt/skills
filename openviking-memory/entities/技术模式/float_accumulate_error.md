# 原生累加金额浮点误差
currentAmount 使用 JS 原生 + 累加产生浮点误差，且 :formatter 写在普通 span 上不生效。

## 问题根因
- currentAmount 用 JavaScript 原生 + 累加产生浮点误差
- :formatter 仅用于表格列，写在普通 <span> 上不生效

## 解决方案
- 改用 calculation.add（基于 mathjs）做精确累加
- 模板调用 formatters.amountFormatter 格式化显示保留两位小数

## 验证与归属
- 验证：extracted source=cursor session=7f055f1f-e22e-4eda-ad4b-120d04d53c43
- 涉及文件：benefit/mobilePreview/pubQuarterlyDeclaration/index.vue、formatters/index.js、utils/calculation.js 等多文件
- 来源会话：7f055f1f-e22e-4eda-ad4b-120d04d53c43；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "float_accumulate_error",
  "source_extraction_id": "ff6806156faa472abe330cb92a0e77f6",
  "version": 1,
  "memory_type": "entities"
}
-->