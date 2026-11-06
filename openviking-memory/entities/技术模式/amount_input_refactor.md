# amount-input 组件替换
产品2.0 项目将两处金额输入从 el-input/zs-input + v-money:0 改为 amount-input 组件。

## 修改明细
- autonomy/multiply/components/MaintainResultDialog.vue：form.minOptionNum 与 form.mixOptionNum 由 el-input + v-money:0 改为 amount-input :dot="0" disabled
- property/partyOrganization/detail.vue：form.fullPartyMember 与 form.probationaryPartyMember 由 zs-input + v-money:0 改为 amount-input :dot="0"

## 验证注意
- 保留整数限制（dot=0）和原有禁用/占位行为
- 两个文件当前有既有 TS 插件报错（与本次替换无直接关系），本次改动未引入新语法问题

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/multiply/components/MaintainResultDialog.vue、property/partyOrganization/detail.vue、components/AmountInput/index.vue、benefit/pubElevMaintenanceIncome/detail.vue
- 所属项目：产品2.0；来源会话：d7c7c5d4-1f13-462a-8aeb-c77645611399；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_input_refactor",
  "source_extraction_id": "c9079b3172974152be69fd2cd009cf8a",
  "version": 1,
  "memory_type": "entities"
}
-->