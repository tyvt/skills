# 停车泊位车位类型字典分离修复
修复园区公共收益项目停车泊位列表「车位类型」列在按产权类型筛选时显示原始数字而非文字的问题。
## 问题根因
- 列表「车位类型」列通过全局 `dictFormatter` 读取 `this.parkingSpaceTypeOptions` 做字典匹配
- 选择「产权类型」筛选时 `onParkingSpaceTypeChange` 会把 `parkingSpaceTypeOptions` 改为对应子集字典
- 产权车位的 `parkingSpaceType = "1"`（人防车位）在公共车位子集字典中找不到匹配项，直接显示原始数字 `1`
## 修复方案
- 将筛选下拉与表格翻译用的字典分离：`parkingSpaceTypeOptions` 始终保留完整字典 `benefit_parking_type`
- 新增 `parkingSpaceTypeFilterOptions` 随产权类型变化，仅用于搜索条件下拉框
- `pubParkingSpaceDetailChange/index.vue`（停车泊位变更）存在相同逻辑，按需一并修复
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/parkingSpace/index.vue、pubParkingSpaceDetailChange/index.vue、pubParkingSpace/components/parkingTable.vue、mixins/listMixins.js
- 所属项目：园区公共收益；来源会话：8f234827-4934-41b5-9ea5-1d36dd635cc0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_type_dict_separation",
  "source_extraction_id": "d911a1df7ac94bea8711193041fef28e",
  "version": 1,
  "memory_type": "entities"
}
-->