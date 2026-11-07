# 定金退款详情监管项目与通栏改造
苏州市房地产监测V3 完成定金退款详情页监管项目字段与退款说明通栏调整。

## 改动内容
- detail.vue 在「项目名称」与「缴款通知书号」间插入「监管项目」（仅 refundType == 'deposit'），只读 disabled，占位「选择缴款通知书后自动带出」。
- 新增表单字段 regulatorProjectName / regulatorProjectId / regulatorProjectCode。
- setPaymentNotice 从选中行回填监管项目字段；setProject 换项目时清空监管项目、缴款通知书号及带出字段。
- 查看态 contentInfo 在项目名称后增加「监管项目」；「退款说明」「撤销原因」使用 DETAIL_COL_FULL。
- 编辑态「退款说明」「撤销原因」使用 FORM_COL_FULL 整行通栏。
- PaymentNoticeDialog.vue 配套调整（来源会话截断）。

## 涉及文件
- zhi2-web-admin/src/views/supervision/deposit/refund/detail.vue
- zhi2-web-admin/src/views/supervision/deposit/refund/components/PaymentNoticeDialog.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：79b2f3ac-4eb2-4ae2-8e42-9d7ca8c66c0f；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_refund_detail",
  "source_extraction_id": "9fd334bb627245ef84af5e82730e7532",
  "version": 1,
  "memory_type": "entities"
}
-->