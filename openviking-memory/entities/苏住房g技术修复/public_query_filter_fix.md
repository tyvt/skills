# 公共查询返回筛选条件丢失修复（苏住房G）
苏住房G 公共查询（物业服务企业查询等）从详情返回列表后筛选条件运算符被错误改为 EQ 导致无数据的修复。

## 问题原因
- 详情页点返回时列表页重新创建并立刻调用 `getList()`，但 `operator_type` 等字典未加载完
- `advancedQueryCore.js` 的 `sanitizeConditionGroups` 在 `operatorTypeOptions` 为空时把所有字段当成固定运算符统一改 `EQ`，导致「包含」「小于等于」等变成 `EQ`，请求参数错，接口返回空

## 修复内容
- 字典未加载时不再把字段视为固定运算符，保留已有 `condition.operator`
- 固定运算符字段取默认值时增加 `condition.operator` 作为兜底

## 验证与归属
- 所属项目：苏住房G；来源会话：6373eaaa-21ce-4148-b0f7-bdd950f4a940；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`advancedQueryCore.js`、publicQuery/propertyCompany/index.vue、toB/companyRecord/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "public_query_filter_fix",
  "source_extraction_id": "ec57e1fd4b5e42818b6deaa5a40b679a",
  "version": 1,
  "memory_type": "entities"
}
-->