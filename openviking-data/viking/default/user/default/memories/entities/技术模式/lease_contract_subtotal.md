# 租赁合同备案列表小计实现
园区物管2.0 的 benefit 模块中，资源/资产租赁合同备案列表页通过 zs-table 增加当前页小计行。

## 实现要点
- 开启合计行：在 data 中设置 showSummary: true（原先默认 false，合计行不显示）
- 实现 showMethod：对当前页 contractAmount（合同金额）求和，格式为两位小数的千分位
- 第一列显示「小计」，与 pubPaymentNotice 等 benefit 模块页面一致
- 修复模板：删除 zs-table 下多余的 `>` 符号

## 展示效果
- 表格底部显示合计行
- 通过 ZsSummaryText 在下方展示「合同金额(元)」的小计值
- 刷新列表页即可看到效果

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/views/benefit/resourcesLeaseContractFiling/index.vue、src/views/benefit/assetsLeaseContractFiling/index.vue、src/mixins 等
- 所属项目：园区物管2.0；来源会话：7c12e81c-34f7-48b0-b63f-8963c13aff75；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_contract_subtotal",
  "source_extraction_id": "007d9a4c5d48457c8a0e1e4cd477c61c",
  "version": 1,
  "memory_type": "entities"
}
-->