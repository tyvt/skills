# 现售方案查看按钮禁用修复
苏州市房地产监测V3 修复现售方案维护后返回申请页查看按钮禁用问题。

## 根因
- 保存接口返回 cashsalePlanId，方案页用 resolveResponseId(res, 'planId') 解析导致 planId 为空
- 回传申请页时 planId 空，「查看」按钮被禁用

## 修改内容
- cashsaleConstants.js 新增 buildPlanPageResult / applyPlanPageResult，通过 extractPlanId 读取 cashsalePlanId，同步 planDocSite → planUrl
- plan/detail.vue 保存成功改用 buildPlanPageResult 构造 sessionStorage 回传数据
- CashsaleDetail.vue 等组件同步修改，cashsale-apply-helpers.js 更新

## 涉及与归属
- 涉及文件：cashsaleConstants.js、plan/detail.vue、CashsaleDetail.vue、cashsale-apply-helpers.js
- 项目：苏州市房地产监测V3；来源会话ID：5c4d5204-0c97-4a4d-bcb7-2b81ff546339

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_plan_view_fix",
  "source_extraction_id": "c002564f850c4da795d9ca098fc59f02",
  "version": 1,
  "memory_type": "entities"
}
-->