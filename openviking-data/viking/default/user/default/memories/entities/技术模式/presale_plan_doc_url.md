# 预售计划PDF的URL解析
在 Suzhou Real Estate Monitoring V3 中，预售计划的 PDF 需读取 `planDocSite` 以避免回退导航到计划页面。

## 问题根因
- 接口返回的 PDF 路径位于 `data.plan.planDocSite`；旧代码读取了不存在的 `planUrl`，导致回退到计划页面。

## 解决方案
- 在 `permitConstants.js` 中添加了 `resolvePlanDocUrl()` 以依次读取 `planDocSite`/`planUrl`。
- 由 `handleQueryPlan()` 和 `canQueryPlan` 调用。
- `vite.config.js` 需要将 `/zhi2-dev` 代理至静态资源。

## 验证
- 验证证据: src=苏州市房地产监测V3/092.md
- 涉及文件: presale/permit/components/detail.vue, PermitPlanPanel.vue, resolveServerAssetUrl.js, companyApplyAudit/detail.vue, detailMixins.js, form.js, .workbuddy/memory/MEMORY.md, .workbuddy/memory/2026-09-11.md
- 源会话: 6976122d-456e-461d-a9a7-8ac465dc9b76; 代码基线: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：6976122d-456e-461d-a9a7-8ac465dc9b76


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_doc_url",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 2,
  "memory_type": "entities"
}
-->
