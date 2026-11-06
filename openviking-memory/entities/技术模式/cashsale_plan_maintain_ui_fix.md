# 现售方案维护页面 UI 修复
苏州市房地产监测V3 现售方案维护页二次修复已完成，涉及保存按钮、新建填报组件与方案页引用。

## 修复内容
- `CashsaleDetail.vue`：「维护」改 `openPlanPage(false)` 可编辑，「查看」改 `openPlanPage(true)` 只读，修复保存按钮缺失与输入框全灰
- 新建 `CashsalePlanFillForm.vue` 现售专用填报组件，含 5 个 Tab：项目基本概况、本期申请现售商品房情况、价格管理、物业服务、售后服务
- 移除预售专用 Tab：预售资金监管、前期物业服务、物业服务用房/社区用房
- 切换方案页引用 `cashsale/plan/detail.vue` 同步更新

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`CashsaleDetail.vue`、`CashsalePlanFillForm.vue`、`cashsale/plan/detail.vue`、`cashsale-apply-helpers.js`
- 所属项目：苏州市房地产监测V3；来源会话：c9033c2c-3a69-4b73-b22e-394f818a3b2b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_plan_maintain_ui_fix",
  "source_extraction_id": "f8bdd9b3412f4342a39559b352c1b670",
  "version": 1,
  "memory_type": "entities"
}
-->