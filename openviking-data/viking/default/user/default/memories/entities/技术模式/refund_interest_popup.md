# 退款利息计算弹窗

重构模式：将退款利息的计算和确认拆分为带有专用弹窗的独立步骤。

## 描述
- 弹窗 «退款利息计算» 的宽度调整为 900px。
- 标签 «结息时间» 修改为 «退款计息时间»。
- 调用 `calAmountRefund` 显示表格（列：业务账户、房产位置等）。
- 随后调用 `refundAmountInterest` 进行保存。
- 房产位置优先使用 `position` 或拼接。

## 关系
- 涉及文件: `accRefund/components/AccountRefundTable.vue`, `accRefund/components/AccountRefundDialog.vue`, `accountSplit/components/AccountListTable.vue`, `accountSplit/detail.vue`, `receiptin/detail.vue`, `main.js`, `api/index.js`, `utils/request.js` (项目 zhi2-web-admin).
- 计算和确认被划分为独立的步骤。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_interest_popup",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 1,
  "memory_type": "entities"
}
-->