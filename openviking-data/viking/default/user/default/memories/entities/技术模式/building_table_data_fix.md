# 楼盘表展示数据不全修复
惠山二期G 项目中，楼盘表因前端兜底分组逻辑裁切数据，改为直接展示接口返回并修复布局的修复套路。

## 问题根因
- buildingFloorGroup.js 用房号推断楼层并重新分组，导致展示不全
- buildingTable/index.vue 的 getBuildHouse() 对接口返回数据做转换，可能裁切真实数据

## 修复方案
- 删除 buildingFloorGroup.js（去除房号推断楼层与重新分组逻辑）
- 恢复 buildingTable/index.vue 中 getBuildHouse() 直接使用接口返回的 response.data，不做任何转换
- 保留 BuildingStateTable.vue 布局修复：自适应 Grid、动态列宽、overflow 可见，确保同层多户完整显示

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 当前行为：接口返回什么展示什么；后端修正楼层分组后前端自动跟随
- 涉及文件：buildingFloorGroup.js、buildingTable/index.vue、BuildingStateTable.vue
- 所属项目：惠山二期G；来源会话：9da606ce-856f-468c-9dca-d8063172f462；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_data_fix",
  "source_extraction_id": "8280b5a305984951910eb7df99f705d7",
  "version": 1,
  "memory_type": "entities"
}
-->