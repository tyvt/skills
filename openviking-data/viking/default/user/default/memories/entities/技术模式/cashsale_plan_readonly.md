# 用于现售计划维护的分离组件区分编辑与只读
在 Suzhou Real Estate Monitoring V3 项目中，`CashsaleDetail.vue` 使用 `openPlanPage(false)` 进行编辑，使用 `openPlanPage(true)` 进行只读，并采用专用组件 `CashsalePlanFillForm.vue`。

## 模式区分
- 维护调用 `openPlanPage(false)` 启用编辑
- 查看调用 `openPlanPage(true)` 为只读模式
- `CashsalePlanFillForm.vue` 是专用于现售的组件

## 组件差异
- 包含 5 个选项卡
- 移除预售特定的选项卡（例如：资金监测）
- 与 `PresalePlanFillForm.vue` 分离

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：c9033c2c-3a69-4b73-b22e-394f818a3b2b
- 验证证据: src=苏州市房地产监测V3/070.md
- 涉及文件: cashsale-apply-menu-config.js, presale/cashsale/plan/detail.vue, presale/permit/plan/detail.vue, CashsaleDetail.vue, PresalePlanFillForm.vue, Headline/index.vue, AnnexUpload/index.vue, cashsale-apply-helpers.js
- 会话: c9033c2c-3a69-4b73-b22e-394f818a3b2b; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_plan_readonly",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->