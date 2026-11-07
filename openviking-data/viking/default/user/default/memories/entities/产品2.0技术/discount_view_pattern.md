# 折扣明细查看态金额直接取接口字段
账单详情中折扣明细查看面板应直接展示主表应收金额，避免前端二次扣减优惠。

## 问题现象
- 查看面板把主表应收金额又减了一次优惠金额，导致与主表不一致
- 主表应收金额在生成账单时已是净额（已扣减优惠）

## 根因分析
- 「优惠前金额」「优惠金额」「应收金额」是后端下发的并列字段，展示层不应再做派生计算
- 编辑态公式「应收=原应收−优惠」被错误复用到查看组件

## 解决方案
- 只读查看面板金额直接取接口返回对应字段，派生计算仅允许在新增/编辑未保存场景
- 用 formMode/readOnly 区分，查看态走纯展示分支
- 同类汇总字段查看态被再算一次，先确认接口是否已给净额

## 验证与归属
- 来源会话 d093c203 诉求5：折扣明细查看直接显示主表应收金额，不用再减优惠
- 涉及文件：zhi2-web-admin/src/views/property/spFeeBill/components/detail.vue、discountTable.vue
- 所属项目：产品2.0；代码基线：a5e7e78

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "discount_view_pattern",
  "source_extraction_id": "8f12761b41b14e02875c9d92abba45c0",
  "version": 1,
  "memory_type": "entities"
}
-->