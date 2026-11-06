
# 缴存金额列对齐修复
产品2.0 的 zhi2-web-admin 中缴存金额列因显式设置左对齐覆盖了默认右对齐，已改为右对齐。
## 问题原因
- `guaranteeDepositAccount/components/AccountDetailTable.vue` 将「缴存金额(元)」列显式设为 `align: 'left'`
- 该设置覆盖了 `zs-table-column` 对金额列的默认右对齐
## 修复方案
- 将 `align` 改为 `'right'`，与列表页、详情页基本信息区的金额字段保持一致
- 刷新后缴存明细和支用明细表格中的金额列均右对齐显示
## 涉及文件与归属
- 文件：`AccountDetailTable.vue`、`detail.vue`、`zs-table-column.vue`
- 项目：产品2.0；来源会话：9ce2b292-a0dd-4ce0-84c9-8366477a8a75；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_amount_align",
  "source_extraction_id": "b7792fafce8b4fca99fa4738624ecb8a",
  "version": 2,
  "memory_type": "entities"
}
-->