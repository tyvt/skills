# 现售维护页专用填报组件修正编辑态
在苏州市房地产监测V3中，现售维护页通过引入专用填报组件修正编辑态逻辑。

## 功能描述
- CashsaleDetail.vue 维护态调用 openPlanPage(false) 可编辑，查看无 PDF 回退 openPlanPage(true) 只读
- 新建 CashsalePlanFillForm.vue 含 5 个现售 Tab（移除预售资金监管等）
- 方案页引用 cashsale/plan/detail.vue 对接该组件

## 涉及页面文件
- zhi2-web-admin/src/views/presale/cashsale/plan/detail.vue
- zhi2-web-admin/src/views/presale/permit/plan/detail.vue
- zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue
- zhi2-web-admin/src/views/presale/permit/components/PresalePlanFillForm.vue

## 涉及公共与测试文件
- zhi2-web-admin/src/components/Headline/index.vue
- zhi2-web-admin/src/components/AnnexUpload/index.vue
- zhi2-web-admin/e2e/fixtures/cashsale-apply-menu-config.js
- zhi2-web-admin/e2e/fixtures/cashsale-apply-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/026.md
- 来源会话：c9033c2c-3a69-4b73-b22e-394f818a3b2b
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_plan_fillform",
  "source_extraction_id": "e01b03786d294aa9a2d001a12e81b671",
  "version": 2,
  "memory_type": "entities"
}
-->