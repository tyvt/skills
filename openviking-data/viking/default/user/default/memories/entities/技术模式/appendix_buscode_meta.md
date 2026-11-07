# 经纪机构详情附件busCode取路由meta
`companyApplyAudit/detail.vue` 未请求附件因 `appendixBusCode` 未适配路由菜单，改为优先注入 busCode 并回溯路由 meta 兜底。

## 问题根因
- `companyApplyAudit/detail.vue` 未请求附件，因 `appendixBusCode` 未适配路由菜单

## 关键修复
- 实现 `appendixBusCode()` 优先取 `CompanyOrganProvider` 注入 busCode
- 次取路由 `meta.busCode` 回溯 `matched` 父级
- 兜底经纪 `030100`/租赁 `030300`，busId 维持 `companyApplyId`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/148.md
- 涉及文件：companyRecord.js、institution/record/detail.vue、workbuddy/memory/2026-09-23.md、company/companyRecordAgency/detail.vue、toB/agencyRecord/detail.vue、companyManagement/components/AgencyBasicInfoDetail.vue、zljg/companyRecordAgency/detail.vue、constants/companyOrgan.js
- 所属项目：苏州市房地产监测V3；来源会话：9f945ea7-96e9-4074-8a4e-83d8ba74ff28；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_buscode_meta",
  "source_extraction_id": "0d247d953872400cb8867fd2a9de659d",
  "version": 1,
  "memory_type": "entities"
}
-->