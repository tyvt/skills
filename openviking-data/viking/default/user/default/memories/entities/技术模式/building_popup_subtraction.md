# 独立页功能不内嵌弹窗减法优先
已有独立页的功能不在变更/详情页内嵌弹窗副本，楼盘表按钮改按filePath跳独立页并删弹窗模板。

## 背景与问题
- 楼幢变更记录页需提供楼盘表查看能力，最初用zs-select-dialog弹窗内嵌一份楼盘表，但项目详情页已有独立楼盘表页面。
- 同一能力两套实现必发散：字段/接口/状态图标口径改两处；弹窗窄容器压扁楼盘表网格（全库反复出现的弹窗坑）。

## 解决方案
- 先确认目标能力是否已有独立页面；有则复用不再写弹窗副本。
- 按钮点击从propertyView(弹窗)改为openBuildingTable，按文件路径解析路由跳转独立页（不手写path字符串，避免与菜单component不一致）。
- 跳转前确认目标页在菜单登记（按filePath跳转依赖菜单路由表，薄入口未登记报「未找到菜单路由」）。
- 删干净：连带删除53行弹窗模板及依赖state/methods/imports，净变更48 insertions,321 deletions，删比加多才算改干净不留死代码。
- 验收出成品页面截图给用户看（本地nginx-ui部署e2e截图取证），只给代码不算交付。

## 验证与归属
- 验证：会话 session-16ca1dd8-a463-4fdb-97df-7a1b83c3b2fb（基线235e6ee）用户诉求1/4/5，最终结论写明按钮改openBuildingTable跳独立页、删53行弹窗、净变更48/321、符合减法优先。
- 涉及文件：zhi2-web-admin/src/views/projectManagement/buildinginfo/changeDetail.vue、building/buildingChange/detail.vue、projectManagement/buildingTable/index.vue。
- 所属项目：zhi2-web-admin；来源会话ID：session-16ca1dd8-a463-4fdb-97df-7a1b83c3b2fb；代码基线：235e6ee。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_popup_subtraction",
  "source_extraction_id": "17610b81bcb7473e99c75e4ee8483cbb",
  "version": 1,
  "memory_type": "entities"
}
-->