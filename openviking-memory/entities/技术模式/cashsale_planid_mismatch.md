# 保存接口字段名不符致回传 planId 空禁用
苏州市房地产监测V3 预售方案保存接口返回 `cashsalePlanId`，方案页误用 `planId` 解析致回传为空、「查看」按钮禁用。

## 问题根因
- 保存接口返回 `cashsalePlanId`，方案页误用 `resolveResponseId(res, 'planId')` 解析
- 致回传申请页 `planId` 为空、「查看」按钮禁用

## 修复方案
- `cashsaleConstants.js` 新增 `buildPlanPageResult`/`applyPlanPageResult` 经 `extractPlanId` 读取正确字段
- `plan/detail.vue` 保存后改用其构造 sessionStorage 回传数据

## 涉及文件
- zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue
- zhi2-web-admin/src/views/presale/permit/components/PermitPlanPanel.vue
- zhi2-web-admin/src/views/presale/cashsale/plan/detail.vue
- zhi2-web-admin/src/views/presale/cashsale/cashsaleConstants.js 与 src/utils/ruoyi.js
- zhi2-web-admin/src/views/presale/permit/permitConstants.js 与 e2e/fixtures/cashsale-apply-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/203.md
- 来源会话：5c4d5204-0c97-4a4d-bcb7-2b81ff546339；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_planid_mismatch",
  "source_extraction_id": "8d3358f862fa431d858799b297104461",
  "version": 1,
  "memory_type": "entities"
}
-->