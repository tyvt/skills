# 统计字段对齐后端 VO 字段（苏住房G）
苏住房G 详情页统计字段已对齐后端 VO 字段名，覆盖物业费收缴相关统计。

## 字段映射
- 本次申报户数：`totalHouseholds`（兼容旧字段 `oweHouseSum`）
- 总面积：`totalArea`
- 已缴户数：`paidHouseholds`
- 未缴户数：`unpaidHouseholds`
- 物业费收缴率：`collectionRate`（接口未返回时，仍按实收/应收计算兜底）

## 数据来源
- 详情接口 `response.data` 合并进表单
- `queryOweFeeStatistic` 返回时覆盖对应字段

## 涉及文件
- zhi2-web-admin/src/views/building/complexSearch/detail.vue
- zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：eaff5bf3-1e81-45b7-9600-20eebd931629；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statistic_fields_vo_mapping",
  "source_extraction_id": "e4b9221bd0ea4bf6b2dde95d6d303034",
  "version": 1,
  "memory_type": "entities"
}
-->