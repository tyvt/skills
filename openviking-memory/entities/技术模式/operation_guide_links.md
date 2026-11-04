# 操作指引外链 links 与 onAction
门户首页操作指引文案加跳转时，在 operationGuideContent.js 为卡片配置 links，不要另写一套路由。

## 跳转规则
- links 为可点击项，触发 $emit('action', link)，由父级既有 onAction 统一处理
- portal 类目标跳 /UnifiedLogin?portal=<portalKey>（如 rental-opening、rental-staff）
- 合同备案查询用 contract-query，由 UnifiedLogin/父级已有 onAction 统一处理
- OperationGuideBody.vue 仅补 query 布局样式（多链接同行、蓝色下划线），业务跳转逻辑保持在 onAction

## 验证与归属
- 验证证据：会话 01a16249 三张 query 卡片改为 links；企业/人员查询映射 rental-opening、rental-staff，备案文案映射 contract-query；结论明确复用 onAction
- 涉及文件：operationGuideContent.js、OperationGuideBody.vue（zhi2-web-admin/src/views/home/operationGuide 下）
- 所属项目：门户；来源会话ID：01a16249-8b21-70c5-a400-74b168ec7d9e；代码基线：fd9ef3e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_guide_links",
  "source_extraction_id": "0325262565af4ddfa2e8ba7da5315c34",
  "version": 1,
  "memory_type": "entities"
}
-->