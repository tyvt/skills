# 押金登记详情校验规则移至computed
`zhi2-web-admin/src/views/maintenance/depositRegister/detail.vue` 将校验规则从 data 重构至 computed，并修复了手续费比较的 bug。

## 解决方案
- 规则从 `data()` 移至 `computed`，返回配置对象以依赖响应式数据
- 校验器保留 `this.validateTransactionDate` 及箭头函数 `this` 绑定
- 手续费比较修复：`Number(this.form.transactionAmount) <= Number(this.form.serviceCharge)` 替换 `Number(this.form.transactionAmount <= Number(this.form.serviceCharge))`

## 文件
- `zhi2-web-admin/src/views/maintenance/depositRegister/detail.vue`

## 验证
- 来源会话：43075a31-52ec-4f80-8279-94db3e9b341c
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_detail_rules_computed",
  "source_extraction_id": "6ed84d5124bd4cf1892f22b04bc78398",
  "version": 2,
  "memory_type": "entities"
}
-->