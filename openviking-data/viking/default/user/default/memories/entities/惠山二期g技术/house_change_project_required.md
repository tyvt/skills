# 房屋信息变更项目前置校验
房屋信息变更（houseChange）弹窗未选项目时楼幢/单元查询返回全量数据，已加项目与楼幢前置校验。

## 问题根因
- zhi2-web-admin/src/views/building/houseChange/detail.vue 楼幢弹窗 filterParams: { projectId } 未选项目时 projectId 为 undefined → 后端返回全部项目楼幢
- 单元查询原先也未带 buildingId 过滤，同样返回全量

## 修复方案
- openBuildingDialog：无 projectId 时提示「请先选择开发项目」并 return，不打开弹窗
- openUnitDialog：新增 buildingId 前置校验，并补 filterParams: { buildingId }
- setProject：切换项目时清空已选楼幢/单元，避免残留旧项目数据
- UI 层保留 :disabled="!form.projectName" 作为双重保险

## 验证与归属
- 验证证据：extracted source=workbuddy project=惠山二期G；另见 src=惠山二期G/013.md
- 涉及文件：zhi2-web-admin/src/views/building/houseChange/detail.vue、zhi2-web-admin/src/views/building/buildingChange/detail.vue
- 所属项目：惠山二期G；来源会话：11ad0957-fe32-4048-b697-514a71caef0a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "house_change_project_required",
  "source_extraction_id": "d00549ef770e4e9a930b1734bf53a230",
  "version": 2,
  "memory_type": "entities"
}
-->