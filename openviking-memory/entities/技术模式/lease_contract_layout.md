# 租赁合同页圆角切换与12列双字段表格
园区物管2.0 中 leaseContract.vue 实现租赁合同页，顶部圆角按钮切换收入/支出合同并重置列表至首页。

## 布局与交互
- 顶部圆角按钮切换收入/支出合同
- 切换时重置列表至首页

## 表格结构
- 表格固定 12 列
- 按收支类型映射 `revenueContractCode`/`expenditureContractCode`
- 按收支类型映射 `customerName`/`supplierName` 等字段

## 验证与归属
- 涉及文件：leaseContract.vue
- 来源会话：43549acf-0aa1-4cd4-8f0e-ee68c6c1e2c8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_contract_layout",
  "source_extraction_id": "d913d1a6135b48b89f883365240910a1",
  "version": 1,
  "memory_type": "entities"
}
-->