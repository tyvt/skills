# 银行回单表格列顺序错乱修复
修复园区公共收益项目银行回单点击后右侧表格列顺序因动态宽度计算错乱的问题，并调整列配置。
## 修改说明
- 列顺序错乱原因：zs-table-column 未设固定宽度时动态计算 min-width，数据加载后列宽重算打乱顺序。
- 用 v-for + bankReceiptColumns 配置列，顺序写死在数组里。
- 每列设置固定 width，避免动态宽度计算。
- 关闭合计行（:show-summary="false"）。
- 给表格加固定 key，切换模式时完整重建。
## 复发与另一修复方案（来源会话 31028abc）
- 列顺序错乱另一根因：bankReceiptColumns 定义顺序本身正确，但用 v-for 动态渲染列时与右侧固定「操作」列组合，Element Table 列渲染顺序错乱（该问题曾复发）。
- 对应修复：将银行回单表格改回与银行对账单一致的静态列定义，数据加载后调用 doLayout() 重新布局。
- 修复后正确列顺序同下，请刷新页面后重新点击「银行回单」确认；若仍异常需上报当前列顺序。

## 正确列顺序
- 序号 → 对方账户名称 → 通知书号 → 交易日期 → 交易金额 → 用途 → 手续费 → 记账金额 → 银行平台流水号 → 结算渠道 → 操作
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue、benefit/pubVerificationReceipts/index.vue
- 所属项目：园区公共收益；来源会话：94e9fe38-5ccd-4e61-8fa5-8929f8b1a0cb、31028abc-b8ae-4e20-8edb-702fd8eb1e0c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_column_fix",
  "source_extraction_id": "8cb7befab8654af79a9acdf99f050a39",
  "version": 2,
  "memory_type": "entities"
}
-->