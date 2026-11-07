# 物业企业信用等级字段字典键不一致修复（苏住房G）
苏住房G 项目修复公共查询中物业企业信用等级字段因前后端字典键不匹配而错误显示为输入框的问题。

## 问题原因
- 后端字典「物业企业信用等级」dictValue 为 `propertyCompanyCreditRating`
- 前端 `COMPLEX_FIELD_META` 中配置名为 `companyCreditLevel` 且 `selectKey: 'creditLevel'`
- `mergeFieldOptions` 按 `dictValue` 匹配元数据失败，valueType 回退为 `text`，字段显示为输入框
- `remark` 为空不是原因，根本在于字段 key 不一致

## 根因确认与状态
- 根因已完全确认，修复方向为对齐前后端字段 key 以恢复下拉选择

## 涉及文件与归属
- 涉及文件：`publicQuery/complex/index.vue`、`complexFieldConfig.js`
- 所属项目：苏住房G；来源会话：04b34f92-8311-4af3-95f1-c6899f1c1f94；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "credit_rating_fix",
  "source_extraction_id": "07c5dd5811794d2c87b3f9503f43828e",
  "version": 1,
  "memory_type": "entities"
}
-->