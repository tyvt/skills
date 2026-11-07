# 筛选项覆盖格式化字典导致列回显码值
停车泊位列表选「产权车位」筛选后，「车位类型」列从中文变数字，停车泊位变更列表同问题。

## 问题根因
- 表格字典列由全局 dictFormatter（main.js）按「列 prop + Options」取字典，parkingSpaceType 列读 parkingSpaceTypeOptions
- onParkingSpaceTypeChange 切换产权类型时把 parkingSpaceTypeOptions 替换成 propertyList 子集
- 格式化拿到缩小字典，列表值来自完整字典 benefit_parking_type 匹配不到，回退显原始数字
- 根因是同一 XXXOptions 同时承担筛选项数据源与列格式化数据源两语义

## 修复方案
- 新增 parkingSpaceTypeFilterOptions 专供筛选项下拉，parkingSpaceTypeOptions 保持完整字典供列格式化
- 抽 updateParkingSpaceTypeFilterOptions，在产权类型切换、重置、初始化三处同步筛选项

## 验证与归属
- 验收：选「产权车位」点搜索，车位类型列显中文（如「人防车位」）
- 验证证据：会话 78f54f15（2026-07-22）修复方案，已 cherry-pick 到 develop/v2.6.1(5bd282839)、v2.6.2(1a5e0ff15)、v2.6.2-yulin(e4cd36ceb)
- 涉及文件：benefit/parkingSpace/index.vue、pubParkingSpace/components/parkingTable.vue、pubParkingSpaceDetailChange/index.vue、main.js
- 所属项目：苏住房G；来源会话：78f54f15-1a3a-45cd-82ca-183abc6df0fb；代码基线：96eaa55

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filter_dict_override",
  "source_extraction_id": "294a6804316941388d16116e511fd383",
  "version": 1,
  "memory_type": "entities"
}
-->