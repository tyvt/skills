# dict-tag 值类型匹配防护
使用 dict-tag 渲染字典标签时，需确保传入 value 的类型与字典 dictValue 类型一致，否则匹配失败不显示。

## 问题根因
- 车位类型等字典的 dictValue 为字符串（如 '1'），但接口返回数字（如 1）。
- ParkingAssetDialog 直接用数字 value 传给 dict-tag，导致字典匹配不到，列不显示。

## 解决方案
- 在传给 dict-tag 的 :value 前统一转字符串（空值不处理）。
- 例如 ParkingAssetDialog.vue 中 :value 改为 dictValue(form[f.prop])，确保 1 显示为“人防车位”。
- 若仍不显示，需核对接口返回字段名与 fields 里 prop 是否对齐。

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证证据：会话 3ee096c3（车位类型数据值1不显示，转字符串后修复）。
- 涉及文件：src/views/benefit/statisticsMap/components/ParkingAssetDialog.vue。
- 来源会话ID：3ee096c3-3217-4512-83ef-b5204479f8cb；代码基线：none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_tag_value_type_match",
  "source_extraction_id": "d891346b25114d0abfd81113c73e838b",
  "version": 1,
  "memory_type": "entities"
}
-->