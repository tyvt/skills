# 物业管理区域查询：管理主体与收费方式（苏住房G）
苏住房G 物业管理区域查询页（publicQuery/complex/index.vue）已新增「管理主体」「收费方式」列与筛选。

## 改动说明
- 列表列：管理主体 `managementSubjectName`（文本，未备案为空）；收费方式 `chargeMethod`，用全局 `dictFormatter` + 已有 `chargeMethodOptions`（`property_charging_method`）
- 高级筛选：complexFieldConfig.js 新增字段 `managementSubject`（单选、`EQ`），`DEFAULT_COMPLEX_FIELDS` 增加「管理主体」兜底
- 字典映射：加载 `benefit_management_subject`，无 `none` 时追加 `{ dictValue: 'none', dictLabel: '未备案' }`，`advancedSelectOptionsMap.managementSubject` 使用上述字典

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/index.vue
- zhi2-web-admin/src/components/zs-advanced-query/complexFieldConfig.js

## 验证与归属
- 所属项目：苏住房G；来源会话：579a0b70-5ca8-42fa-86cb-0af96a7205d9；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_query_management_subject",
  "source_extraction_id": "e4b9221bd0ea4bf6b2dde95d6d303034",
  "version": 1,
  "memory_type": "entities"
}
-->