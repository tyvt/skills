# depositRegister 详情页 rules 改计算属性
园区物管2.0（zhi2-web-admin）中 `src/views/maintenance/depositRegister/detail.vue` 将 `rules` 改为计算属性并修正手续费比较逻辑。

## 已完成修改
- 从 `data()` 删除 `rules`，在 `computed` 新增 `rules()`，返回与原先一致的校验配置
- `validator` 仍使用 `this.validateTransactionDate` 及箭头函数里的 `this.form` / `this.patterns`
- 修正手续费比较：原 `Number(this.form.transactionAmount <= Number(this.form.serviceCharge))` 先算布尔再转数字，语义错误
- 改为 `Number(this.form.transactionAmount) <= Number(this.form.serviceCharge)`，与「交易金额不能小于等于手续费」文案一致
- 模板 `:rules="rules"` 无需改动

## 遗留说明
- L72、L394 关于 `currentAccount`、`patterns` 的 TS 提示为原有问题（`form` 类型、`patterns` 来自 mixin），非本次改动引入

## 涉及文件
- zhi2-web-admin/src/views/maintenance/depositRegister/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：园区物管2.0（2-0）；来源会话：43075a31-52ec-4f80-8279-94db3e9b341c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "depositregister_rules_computed",
  "source_extraction_id": "f8b4f9aed74b471bb17b7829c522f1b4",
  "version": 1,
  "memory_type": "entities"
}
-->