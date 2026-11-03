# 资金拨付详情展示社区见证
苏住房G资金拨付(pubAllotNotice)详情页在「用款申请」项上方展示社区审批见证信息。

## 问题背景
- 原pubAllotNotice详情页未展示社区审批见证信息

## 解法要点
- DetailTemplate组件新增labelAbove属性
- pubAllotNotice/detail.vue的form增加approvalDeptName字段（由接口getPubAllotNotice返回）
- useMoneyInfo项在approvalDeptName有值时，设labelAbove为「${approvalDeptName}社区已见证通过」
- 依赖后端/benefit/pubAllotNotice/{id}返回approvalDeptName字段

## 验证与归属
- 来源：苏住房G/044.md；会话6a520d7b-daeb-45ff-b2c6-7701acbb59d1
- 涉及文件：benefit/pubAllotNotice/detail.vue、pubPaymentNotice/detail.vue、api/capital/node.js、api/capital/paymentDetail.js、benefit/pubTradeModel/index.vue、api/finance/appropriation.js、pubAllotNotice/index.vue、pubAllotNotice/components/pubTradeDetailTable.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "pub_allot_witness",
  "source_extraction_id": "bbef648410d54c61896564bae729c765",
  "version": 1,
  "memory_type": "entities"
}
-->