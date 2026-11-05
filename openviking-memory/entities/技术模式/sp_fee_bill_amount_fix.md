# 收款弹窗待收金额计算错误修复
产品2.0 的 spFeeBill 收款弹窗因 ?? 运算符误用导致金额显示 0.00 问题已修复。

## 问题根因
- collectionDialog.vue 中 getBillReceivable 使用 `bill.unpaidAmount ?? bill.receivableAmount ?? bill.billAmount ?? 0`
- 当 unpaidAmount 为数字 0 而 receivableAmount 为 0.01 时取 0，致收款金额与合计显示 0.00
- 表格刷新后使用旧勾选数据打开收款可能拿过期金额

## 修复方案
- collectionDialog.vue：待收金额优先用「应收金额 - 实收金额」，unpaidAmount 仅作兜底
- index.vue：打开收款弹窗前用当前表格最新行数据同步账单，避免缓存过期

## 验证与归属
- 验证：应收 0.01 时收款金额应显示 0.01；余额抵扣后合计可能 0.00 属正常
- 文件：property/spFeeBill/components/collectionDialog.vue、components/index.vue
- 所属项目：产品2.0；来源会话：a3cfd7af-98f1-41cd-a0ce-0592087251ad；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sp_fee_bill_amount_fix",
  "source_extraction_id": "9a39b38a52124808ace9dff74296b3b4",
  "version": 1,
  "memory_type": "entities"
}
-->