# 租赁合同页实现收入支出切换
leaseContract.vue 按照设计图实现租赁合同页，支持收入/支出合同圆角切换与12列表格展示。

## Description
- 顶部两个并排圆角按钮切换收入合同/支出合同，默认选中支出合同。
- 选中为蓝底白字，未选中白底灰边，切换时重新请求列表并重置第一页。

## 表格字段
- 12列包含选择、序号、合同编号、小区名称、合同名称、合同金额、供应商名称、联系人、签订日期等。
- 收入合同用 revenueContractCode、customerName、customerContact；支出合同用 expenditureContractCode、supplierName、payerContact。

## 接口与归属
- 收入合同接口 listPubRevenueContract，支出合同接口 listPubExpenditureContract。
- 验证证据：extracted source=cursor project=repository
- 涉及文件：leaseContract.vue、overviewContent.vue
- 来源会话ID：43549acf-0aa1-4cd4-8f0e-ee68c6c1e2c8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_contract_page",
  "source_extraction_id": "2b613728a85544a581e8279650d99ee9",
  "version": 1,
  "memory_type": "entities"
}
-->