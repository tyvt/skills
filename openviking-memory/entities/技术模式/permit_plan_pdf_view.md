# 预售方案查看PDF修复
苏州市房地产监测V3 预售许可详情「查看」方案现可正确在新标签页打开 PDF。

## 问题根因
- 接口返回 PDF 路径在 data.plan.planDocSite（如 /zhi2-dev/2026/c/q/2/xxx.pdf），旧代码只读不存在的 planUrl 导致回退跳转方案页

## 修复内容
- permitConstants.js 新增 resolvePlanDocUrl()，按顺序读取 planDocSite / planUrl（含 plan 嵌套）
- handleQueryPlan() 与 canQueryPlan 均改为使用该函数
- 本地若仍 404，需确认 vite.config.js 中 /zhi2-dev 静态资源代理已配置

## 涉及文件与归属
- 涉及文件：permitConstants.js、vite.config.js、presale/permit/components/detail.vue
- 所属项目：苏州市房地产监测V3
- 来源会话：6976122d-456e-461d-a9a7-8ac465dc9b76
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_plan_pdf_view",
  "source_extraction_id": "fd68f442701b43a49b6d854439887c52",
  "version": 1,
  "memory_type": "entities"
}
-->