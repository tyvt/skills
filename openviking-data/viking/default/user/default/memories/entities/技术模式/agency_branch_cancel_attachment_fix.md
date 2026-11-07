# 主管部门分支机构注销附件业务编码修复
苏州市房地产监测V3 中主管部门分支机构注销弹窗附件不显示，已修复 CancelDialog.vue 的业务编码与挂载时机问题。

## 问题根因
- 业务编码未生效：CancelDialog 通过 getRouteMetaValue(this.$route, 'cancelBusCode') 取附件业务编码，路由 meta 未配置 cancelBusCode 返回空，AnnexUpload 不请求附件列表
- 组件挂载时机不对：AnnexUpload 只在 created 时拉取附件，弹窗初次挂载时 agencyBranchId 仍为空，后续传入 ID 不会重新加载

## 修复内容
- CancelDialog.vue 为 cancelBusCode 增加默认值 agency_branch_cancel（与详情页 fzjgba 的 fallback 方式一致）
- 给 AnnexUpload 加 v-if="visible && agencyBranchId" 和 :key，确保弹窗打开且 ID 就绪后再挂载，每次打开重新拉取附件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3；另据 src=苏州市房地产监测V3/273.md
- 所属项目：苏州市房地产监测V3；来源会话：4f553a87-b022-4362-834b-2964f2ec1897
- 涉及文件：CancelDialog.vue、AnnexUpload/index.vue、utils/appendix.js、AgencyBranchList.vue、routeMeta.js、StatusAdjustDialog.vue、institution-menu-config.js、AgencyBranchDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_cancel_attachment_fix",
  "source_extraction_id": "f8bdd9b3412f4342a39559b352c1b670",
  "version": 2,
  "memory_type": "entities"
}
-->