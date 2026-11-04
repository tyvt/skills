# cashsalePlanId 解析错误
保存 API 返回 cashsalePlanId，但计划页面使用了 resolveResponseId(res,'planId')，导致 planId 为空并禁用了查看按钮。
## 原因
- 后端返回字段 cashsalePlanId，前端将其解析为 planId。
- 带有空 planId 的 sessionStorage 禁用了查看按钮。
## 修复
- 在 cashsaleConstants.js 中添加 buildPlanPageResult 以使用 extractPlanId 读取。
- plan/detail.vue 使用该函数构建返回的 sessionStorage。
## 验证
- 来源: 苏州市房地产监测V3-leftover/005.md; 会话 5c4d5204-0c97-4a4d-bcb7-2b81ff546339.
- 涉及文件: CashsaleDetail.vue, PermitPlanPanel.vue, plan/detail.vue, cashsaleConstants.js, ruoyi.js, permitConstants.js.

<!-- MEMORY_FIELDS
{
  "category": "技术Bug",
  "name": "cashsale_planid_bug",
  "source_extraction_id": "96963c4591f34599a58a91018404b608",
  "version": 1,
  "memory_type": "entities"
}
-->