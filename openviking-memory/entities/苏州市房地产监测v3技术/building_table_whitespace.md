# 楼盘表上方留白修复
苏州市房地产监测V3楼盘表因Tab卡片撑满视口留白过大，已通过整页滚动与样式收紧修复。

## 问题根因
- .detail-container.building-container中项目信息Tab卡片flex撑满视口留白
- buildingTable/index.vue有margin-top:20px与高line-height

## 修复方案
- index.scss纳入整页滚动并收缩tabs
- buildingTable/index.vue去overflow与margin-top并收紧行高

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：buildingTable/index.vue、projectForm.vue、styles/index.scss、zs-tabs.vue、BuildingTableViewTabs.vue、BuildingStateTable.vue等
- 来源会话：c9764d9b-dbcd-4ca7-b755-422b671095e6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "building_table_whitespace",
  "source_extraction_id": "48282b6d94f34f6a8a8894ba97586423",
  "version": 1,
  "memory_type": "entities"
}
-->