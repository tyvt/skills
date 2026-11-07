# 属性筛选器覆盖字典并在车位类型列显示数字
在项目 Park Public Benefit (zhi2-web-admin) 中，parkingSpace/index.vue 中的函数 onParkingSpaceTypeChange 将 parkingSpaceTypeOptions 替换为字典的子集，导致 dictFormatter 失败并显示数字 1。

## 问题根因
- onParkingSpaceTypeChange 将 parkingSpaceTypeOptions 替换为筛选器子集
- dictFormatter 找不到匹配项，并在车位类型列显示原始数字 1

## 解决方案
- 分离选项：parkingSpaceTypeFilterOptions 用于筛选，完整的 parkingSpaceTypeOptions (benefit_parking_type) 用于格式化

## 涉及的文件
- src/views/benefit/parkingSpace/index.vue
- src/views/benefit/pubParkingSpace/components/parkingTable.vue
- src/mixins/listMixins.js
- src/mixins/table.js
- src/main.js
- src/views/benefit/parkingSpace/detail.vue
- src/views/benefit/parkingManage/index.vue
- src/views/benefit/pubParkingSpaceDetailChange/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：8f234827-4934-41b5-9ea5-1d36dd635cc0
- 所属项目: Park Public Benefit; 会话: 8f234827-4934-41b5-9ea5-1d36dd635cc0; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_dict_override",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->