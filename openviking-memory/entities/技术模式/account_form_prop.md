# 子表组件传主单form勿用$attrs.form
账户拆分等详情子表需要主单 form 做校验或合计时，应显式 :form="form" 而非 :form="$attrs.form"。

## 问题根因
- Vue2 子组件绑定 :form="$attrs.form" 常拿不到父级 form（attrs 未透传或键名不一致）
- 表现为子表校验/合计静默失效

## 解决方案
- 模板显式 :form="form"（或 props 声明后传入）
- setAccountName 类回写应用字段级 merge，避免整对象覆盖冲掉主单主键字段

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：账户拆分会话修复 AccountListTable :form="form"（原 $attrs.form 无效）；setAccountName 改 merge
- 涉及文件：maintenance/accountSplit/components/AccountListTable.vue、maintenance/accountSplit/detail.vue
- 所属项目：园区公共收益；来源会话：46eb821e-f488-4bb3-b973-6647aedb4d2b；代码基线：7458acc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_form_prop",
  "source_extraction_id": "684fafd2b29640698c2b0bf8580c7d26",
  "version": 1,
  "memory_type": "entities"
}
-->