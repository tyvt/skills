# 楼盘表直用接口数据且布局防裁切
惠山二期G 项目楼盘表移除前端分组逻辑直接采用接口数据并保留防裁切布局的模式。

## 修改要点
- 删除 buildingFloorGroup.js 的房号推断楼层与重新分组逻辑
- buildingTable/index.vue 的 getBuildHouse() 直接返回 response.data 不做转换
- 保留 BuildingStateTable.vue 自适应 Grid、动态列宽与 overflow 可见布局，避免同层多户被 CSS 裁切

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证证据：src=惠山二期G/006.md
- 涉及文件：views/components/BuildingStateTable.vue、views/building/buildingTable/index.vue、views/building/project/detail.vue、utils/buildingFloorGroup.js
- 所属项目：惠山二期G；来源会话：9da606ce-856f-468c-9dca-d8063172f462；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_direct_api",
  "source_extraction_id": "3b024a03f1f641b08ea6be6c3dd919ff",
  "version": 1,
  "memory_type": "entities"
}
-->