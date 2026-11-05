# 银行回单表格列顺序错乱修复
修复园区公共收益项目银行回单点击后右侧表格列顺序因动态宽度计算错乱的问题，并调整列配置。
## 修改说明
- 列顺序错乱原因：zs-table-column 未设固定宽度时动态计算 min-width，数据加载后列宽重算打乱顺序。
- 用 v-for + bankReceiptColumns 配置列，顺序写死在数组里。
- 每列设置固定 width，避免动态宽度计算。
- 关闭合计行（:show-summary="false"）。
- 给表格加固定 key，切换模式时完整重建。
## 正确列顺序
- 序号 → 对方账户名称 → 通知书号 → 交易日期 → 交易金额 → 用途 → 手续费 → 记账金额 → 银行平台流水号 → 结算渠道 → 操作
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue、benefit/pubVerificationReceipts/index.vue
- 所属项目：园区公共收益；来源会话：94e9fe38-5ccd-4e61-8fa5-8929f8b1a0cb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_column_fix",
  "source_extraction_id": "044e3b4a996244d2bf42860f06972767",
  "version": 1,
  "memory_type": "entities"
}
-->