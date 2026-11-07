# amount 类型展示项值绑定修复
产品2.0 项目中 `type: 'amount'` 的展示项原使用 `this.formatters.amountFormatter(...)` 预格式化，已全量改为直接绑定 `this.form.xxx`。

## 修复内容
- 凡是 `type: 'amount'` 的展示项，`value` 都改为直接绑定 `this.form.xxx`，不再使用 `this.formatters.amountFormatter(...)` 预格式化
- 本次共修改 `zhi2-web-admin` 下 24 个文件

## 校验与验证
- 全局搜索 `value: this.formatters.amountFormatter('', '', this.form.` 已无匹配
- 已跑过 lints，未发现新增报错

## 涉及文件与归属
- 涉及文件：`owner/vote/detail.vue`、`building/project/detail.vue`、`benefit/pubUseMoneyApply/detail.vue` 等
- 所属项目：产品2.0；来源会话：959c4f79-0192-4b53-a367-9630388e7f62；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_value_binding",
  "source_extraction_id": "a0aa551040bb463183a5bf54308c95b5",
  "version": 1,
  "memory_type": "entities"
}
-->
