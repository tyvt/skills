# 资金缴存详情编辑无表单修复
房屋质量保证金资金缴存详情页点击编辑无输入框、保存无反应，已通过编辑态切换 zs-form 修复。

## 问题根因
- `guaranteeDeposit/components/detail.vue` 始终渲染只读 `DetailTemplate`，点击编辑 `formMode` 变 `edit` 但未切换到可编辑表单
- 保存调用 `submitForm`→`validateForm` 需 `ref="form"` 表单实例；页面无表单，`$refs.form` 为 undefined，校验失败被静默拦截

## 修复方案
- 参考 `guaranteeDepositAccount/detail.vue` 与 `AddDialog.vue`：查看模式用 `DetailTemplate`，编辑模式用 `zs-form`
- 可编辑字段：缴存金额、缴存日期、备注；只读字段：业务申请编号、账户名称、业务账户、余额、业务状态
- 补充校验规则：金额必填且大于0、日期必填、备注最长500字；日期选择器禁选未来日期
- 该组件同时用于「资金缴存」与「资金支用」详情，支用页金额/日期字段一并支持编辑

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDeposit/components/detail.vue、guaranteeDepositAccount/detail.vue、AddDialog.vue、guaranteeDeposit/deposit/detail.vue、deposit/index.vue
- 所属项目：产品2.0；来源会话：b0ca50b6-00f0-4d36-8845-29a8aaad4b5c；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_edit_fix",
  "source_extraction_id": "b837a06438f441dda7f1aae99615b63a",
  "version": 1,
  "memory_type": "entities"
}
-->
