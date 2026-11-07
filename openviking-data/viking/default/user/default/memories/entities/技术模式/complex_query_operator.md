# 物业管理区域查询：物业类型查询条件改造（苏住房G）
苏住房G 项目公共查询模块改造了高级查询中物业类型字段的操作符读取与可用操作符配置。

## 改动说明
- 操作符改为从 `operator_type` 字典读取，移除本地定义的 `TEXT_OPERATORS`、`SELECT_OPERATORS`、`NUMBER_DATE_OPERATORS`，展示名称统一从字典获取
- 物业类型 `propertyType` 配置可用操作符：`等于（EQ）`、`包含（LIKE）`，取消对所有下拉字段统一锁定为「等于」的限制
- 选择物业类型后操作符下拉框显示「等于」和「包含」两个选项

## 字典配置规则
- 筛选字段继续从 `complex_field` 字典读取
- 字段可用操作符可在 `complex_field` 的 `remark` 第 4 段配置，如 `select:propertyType::EQ,LIKE`
- 未配置时下拉类字段默认仅支持「等于」；物业类型字段兜底支持 `EQ` 和 `LIKE`（数据常为多类型组合）

## 涉及文件与归属
- 涉及文件：`index.vue`、`complexFieldConfig.js`、`zs-advanced-query.vue`、`publicQuery/complex/index.vue`
- 所属项目：苏住房G；来源会话：7352b93f-fe22-4f83-926d-29ade7bd05f8；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_query_operator",
  "source_extraction_id": "74b6128c507f42e8a98d5534bd5fc33d",
  "version": 1,
  "memory_type": "entities"
}
-->