# 分支注销附件因编码缺失与挂载过早未加载
苏州市房地产监测V3 中 CancelDialog 取 cancelBusCode 返回空、AnnexUpload 仅 created 拉取且不重载，致注销附件不加载。

## 问题根因
- CancelDialog 通过 getRouteMetaValue 取 cancelBusCode 时路由 meta 未配置致返回空
- AnnexUpload 仅在 created 拉取且初始 agencyBranchId 为空不重载

## 解决方案
- CancelDialog.vue 为 cancelBusCode 设默认值 agency_branch_cancel
- AnnexUpload 加 v-if="visible && agencyBranchId" 与 :key 按需重挂载

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/273.md
- 涉及文件：CancelDialog.vue、AnnexUpload/index.vue、appendix.js、AgencyBranchList.vue、routeMeta.js、StatusAdjustDialog.vue、institution-menu-config.js、AgencyBranchDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：4f553a87-b022-4362-834b-2964f2ec1897；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_cancel_attachment",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 2,
  "memory_type": "entities"
}
-->