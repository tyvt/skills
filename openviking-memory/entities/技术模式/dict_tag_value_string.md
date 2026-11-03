
# dict-tag 值类型须与字典 dictValue 一致
dict-tag 渲染依赖字典匹配，字典 dictValue 多为字符串，接口返回数字会导致匹配不到显示空白。
## 问题根因
- dict-tag 渲染依赖字典匹配，字典 dictValue 多为字符串（如 "1"）
- 接口返回数字（如 1）时匹配不到，显示空白
## 解决方案
- 传给 dict-tag 的 `:value` 先 `String()` 转换（空值不处理），数字型字典值才能正确显示
- 示例：车位类型 1 转字符串后匹配显示「人防车位」
## 验证与归属
- 010.md 会话 3ee096c3：ParkingAssetDialog 车位类型值 1 不显示，转字符串后匹配
- 涉及文件：src/views/benefit/statisticsMap/components/ParkingAssetDialog.vue
- 来源会话ID：3ee096c3-3217-4512-83ef-b5204479f8cb；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_tag_value_string",
  "source_extraction_id": "7cb162820bf54c0cb79063c7eae44880",
  "version": 1,
  "memory_type": "entities"
}
-->