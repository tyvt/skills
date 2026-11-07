# incomeExpenseDetail字典初始化补全
园区物管 incomeExpenseDetail.vue 字典未初始化致单元格空白需补全选项。

## 问题描述
- `dictFormatter` 因未初始化 `isCorrectionOptions`/`isBusinessReconciliationOptions` 返回空串，致单元格空白。

## 解决方案
- `created()` 调用 `initDict()` 拉取 `benefit_is_correction` 与 `benefit_is_business_reconciliation` 字典补全选项。

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 涉及文件：incomeExpenseDetail.vue
- 来源会话：7111a4be-91a8-4d4e-86f1-04e6cabb0d0c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_formatter_init",
  "source_extraction_id": "521472eab75e4ad389f3eebfdb229651",
  "version": 1,
  "memory_type": "entities"
}
-->