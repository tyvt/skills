# 物业小区基本信息变更模块无楼幢范围新增接口，备案组件被 show-button=false 截断
太仓G端物业小区基本信息变更模块缺少楼幢范围新增接口，备案组件因写死 show-button=false 导致关联楼栋链路被截断。

## 问题根因
- `propertychange`(`propertyChange.js`) 仅基本信息变更 CRUD，无类似规划/施工许可的 `*ChangeBuild` 楼幢接口。
- 楼幢关联在备案模块 `propertyProject.js`：提供 `GET/POST/DELETE /estate/proyprojectRange`、`selectPropertyBuildingList` 等。
- 变更详情复用 `propertyProjectHouseTable.vue` 但写死 `:show-button="false"`，整条「弹窗选楼幢 → POST proyprojectRange」链路不执行，已备案小区未关联楼栋时变更页看不到「新增」。

## 可选方案
- 方案 A：前端放开按钮并接备案接口，后端须确认已备案是否允许直接 POST。
- 方案 B：新增变更专用范围接口待审核同步。
- 本仓库无 Java，后端行为需另行确认。

## 验证与归属
- 验证：会话 8434f9d1 已备案小区要关联楼栋无新增按钮；排查 propertychange API 与 propertyProjectHouseTable 的 show-button、addProyprojectRange 调用对比。
- 涉及文件：zhi1-web-admin/src/api/estate/propertyProject.js、zhi1-web-admin/src/views/property/propertychange/detail.vue、zhi1-web-admin/src/views/property/propertyProject/components/propertyProjectHouseTable.vue、zhi1-web-admin/src/views/property/propertyProject/detail.vue
- 所属项目：太仓G；来源会话：8434f9d1-cba5-4cf2-bb2f-c0e77e746c05；代码基线：df87537

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "propertychange_build_range",
  "source_extraction_id": "dc704c74760d4525ac86f3177b7c0dae",
  "version": 1,
  "memory_type": "entities"
}
-->