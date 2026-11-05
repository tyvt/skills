# 退款利息计算弹窗改造
退款利息计算弹窗已按新设计改造，计算与确认拆分为两个独立步骤，结果表格展示多列信息。

## 交互流程
- 填写参数：退款计息时间、年利率 annualInterestRate
- 开始计算：调用 /maintenance/accRefund/detail/calAmountRefund，结果展示在弹窗表格
- 确认利息：调用 /maintenance/accRefund/detail/refundAmountInterest 保存利息

## 结果表格列
- 展示列：序号、业务账号、房屋坐落、当前账户余额(元)、本年度利息(元)、结息后余额(元)

## 其他调整
- 弹窗宽度由 480px 调整为 900px
- 「结息时间」改为「退款计息时间」
- 计算与确认拆分为两个独立步骤，不再一点击同时计算并保存
- 房屋坐落优先取 position，否则用楼幢号-单元号-户室号拼接

## 验证与归属
- 所属项目：产品2.0
- 来源会话ID：fa1e34a2-4bd1-44f4-88bc-016e3ac401d3
- 涉及文件：AccountRefundTable.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_interest_dialog",
  "source_extraction_id": "00a25f2a044543009563b95e37f53c30",
  "version": 1,
  "memory_type": "entities"
}
-->