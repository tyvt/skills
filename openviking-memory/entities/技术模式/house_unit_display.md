# HouseAssetDialog单位拼接于值后
园区物管 HouseAssetDialog.vue 中单位需拼接于值后而非 label 后。

## 问题描述
- `houseArea` 增 `unit:'㎡'`、`amount` 增 `unit:'元'`，模板需将单位拼接于值后而非 label 后。

## 解决方案
- 模板调用 `displayValueWithUnit(form[prop], f.unit)` 将单位拼接于值后，label 保持为面积/金额。

## 验证与归属
- 涉及文件：HouseAssetDialog.vue
- 来源会话：c966644d-67ff-4f63-b8b6-57e06e8c7220；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_unit_display",
  "source_extraction_id": "521472eab75e4ad389f3eebfdb229651",
  "version": 1,
  "memory_type": "entities"
}
-->