# 房屋质量保证金明细未备案记录过滤
产品2.0 项目中房屋质量保证金账户详情页子表组件查询缴存/支用明细时未传 bizState，导致未备案记录错误展示，已在 getQueryParams() 增加 bizState: '2' 修复。

## 问题根因
- `AccountDetailTable.vue` 查询缴存/支用明细时未传 `bizState`，导致待提交、审核中的记录也会出现在账户的缴存明细/支用明细中
- 涉及文件：`AccountDetailTable.vue`、`detail.vue`、`subTableMixins.js`

## 修复内容
- 在 `getQueryParams()` 中增加 `bizState: '2'`，只查询已备案的记录
- 资金缴存/支用处于「待提交」等未备案状态时，不会再同步到账户详情的缴存明细/支用明细
- 只有 `bizState=2`（已备案）的记录才会展示

## 验证与归属
- 可在账户详情页验证：待提交状态的缴存记录不应再出现在缴存明细 tab 中
- 所属项目：产品2.0；来源会话：5050ef10-38f1-41cf-a707-d4f0fa6f0f5a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_bizstate_filter",
  "source_extraction_id": "a0aa551040bb463183a5bf54308c95b5",
  "version": 1,
  "memory_type": "entities"
}
-->