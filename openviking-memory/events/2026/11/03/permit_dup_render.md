# Summary
On 2026-11-03, a bug was fixed where `PermitPlanPanel.vue`'s '预售方案' section used `AnnexUpload` without passing a `bus`, defaulting to route `ysxksq`, which loaded the same attachments as '要件上传' `AppendixPackageSection`, causing duplicate rendering. The fix removed the embedded `AnnexUpload` from `PermitPlanPanel.vue`, kept the `DetailTemplate` summary and maintenance entry, and moved plan attachments to `presale/permit/plan/detail.vue` for independent maintenance. Verification source: 苏州市房地产监测V3-rest/015.md.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】预售方案未传bus致与要件上传重复ysxksq
【内容】`PermitPlanPanel.vue`中「预售方案」使用`AnnexUpload`未传`bus`，默认复用路由`ysxksq`，与「要件上传」`AppendixPackageSection`加载同一套要件，导致重复渲染。从`PermitPlanPanel.vue`移除内嵌`AnnexUpload`，保留`DetailTemplate`摘要与维护入口，方案要件移至`presale/permit/plan/detail.vue`独立维护。
【验证证据】src=苏州市房地产监测V3-rest/015.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/institutionRegister/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/Headline/index.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyRegister/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/styles/index.scss ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitInfoPanel.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitPlanPanel.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/entrustSale/detail.vue
【来源会话ID】4544dadc-80b6-40ef-8002-3d6ab970a0b4
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "permit_dup_render",
  "goal": "Fix duplicate render bug",
  "summary": "On 2026-11-03, a bug was fixed where `PermitPlanPanel.vue`'s '预售方案' section used `AnnexUpload` without passing a `bus`, defaulting to route `ysxksq`, which loaded the same attachments as '要件上传' `AppendixPackageSection`, causing duplicate rendering. The fix removed the embedded `AnnexUpload` from `PermitPlanPanel.vue`, kept the `DetailTemplate` summary and maintenance entry, and moved plan attachments to `presale/permit/plan/detail.vue` for independent maintenance. Verification source: 苏州市房地产监测V3-rest/015.md.",
  "ranges": "7-13",
  "source_extraction_id": "291e87acf6c04172af7e4add2ede74d6",
  "version": 1,
  "memory_type": "events"
}
-->