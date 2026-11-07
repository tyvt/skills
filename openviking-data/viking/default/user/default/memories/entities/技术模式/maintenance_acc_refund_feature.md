# 维修资金账户退款申请功能
产品2.0 项目按现有规范新建维修资金退款（账户退款申请）功能，包含列表页、详情页与多个组件。

## 文件结构
- zhi2-web-admin/src/views/maintenance/accRefund/index.vue：列表页
- detail.vue：详情/表单页
- components/AccountRefundTable.vue：账号退款列表（退款明细）
- components/HistoryRefundNoticeDialog.vue：选择历史退款通知书
- components/AccountRefundDialog.vue：编辑/查看账户退款
- components/TradeDetailTable.vue：退款记账明细
- components/TradeDetailDialog.vue：记账明细查看

## 功能说明
- 列表页 API：GET /maintenance/accRefund/apply/page，支持关键字、退款申请类型、业务状态查询，导出 POST /maintenance/accRefund/apply/export
- 详情页：基本信息含物业管理区域、账户类型（业主基本账户/电梯消防资金专户）、出款账号及自动带出字段；退款申请信息含退款类型

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：index.vue、detail.vue、AccountRefundTable.vue、HistoryRefundNoticeDialog.vue；所属项目：产品2.0；来源会话：f23a2459-353c-41d6-93aa-1abf998360f7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintenance_acc_refund_feature",
  "source_extraction_id": "b03b5caf46e0410f892f1f3a0dcce3da",
  "version": 1,
  "memory_type": "entities"
}
-->