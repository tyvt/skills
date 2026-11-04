# 经纪机构备案详情附件 busCode 取值链路
苏州市房地产监测V3 中 `companyApplyAudit/detail.vue` 的 `appendixBusCode()` 按菜单优先链路取附件业务编码，兜底入网注册编码。

## 实现细节
- `appendixBusCode()` 返回 `this.resolvedRegisterBusCode || resolveAgencyRecordAppendixBusCode(this.$route, this.resolvedOrganType)`
- 取值链路（菜单优先，不写死）：`CompanyOrganProvider` 注入的 busCode（zljg 租赁套壳）→ 路由 `meta.busCode` 经 `getRouteMetaValue` 向上回溯 `matched` 父级（详情子路由继承列表菜单）→ 兜底入网注册编码（经纪 `030100` / 租赁 `030300`）
- `busId` 仍为 `companyApplyId`

## 验证与归属
- ESLint 该文件 0 error / 0 warning
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/company/companyApplyAudit/detail.vue、zhi2-web-admin/src/api/company/companyRecord.js、zhi2-web-admin/src/views/institution/record/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：9f945ea7-96e9-4074-8a4e-83d8ba74ff28；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_record_appendix_buscode",
  "source_extraction_id": "6e905a64a52f47dcb6f6e7f89e7320b7",
  "version": 1,
  "memory_type": "entities"
}
-->