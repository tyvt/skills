# incomeExpenseDetail字典缺失致列空白
incomeExpenseDetail.vue 中两列使用全局 dictFormatter 因未初始化字典选项数组导致单元格显示空白，已补齐字典。

## 问题根因
- 表格列使用 :formatter="dictFormatter" 依赖全局字典选项数组
- incomeExpenseDetail.vue 未初始化 isCorrectionOptions / isBusinessReconciliationOptions
- dictFormatter 找不到对应选项返回空字符串，导致“是否冲正”“是否已对账”列空白

## 解决方案
- 在 incomeExpenseDetail.vue 中定义 isCorrectionOptions: [] 与 isBusinessReconciliationOptions: []
- created() 调用 initDict() 拉取 benefit_is_correction 与 benefit_is_business_reconciliation 字典
- 刷新后对应列正常显示文案

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 涉及文件：src/views/benefit/statisticsMap/incomeExpenseDetail.vue
- 来源会话ID：7111a4be-91a8-4d4e-86f1-04e6cabb0d0c
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "income_expense_dict_blank",
  "source_extraction_id": "aaadbf8ca9be4ccba8e374a3527b183d",
  "version": 1,
  "memory_type": "entities"
}
-->