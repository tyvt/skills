# 子表字典因isIncome异步未加载
因异步依赖未解析导致字典未加载，显示原始代码。

## 根因
- 在子表 `created` 中，`isIncome`（依赖异步的 `loanDirction`）未计算导致 `return`。
- `relBusinessTypeOptions` 未加载，`dictFormatter` 显示原始代码 `1,2`。

## 解决方案
- 进入页面时加载合并字典（例如：`PUB_LEASE_CONTRACT_TYPE`）。
- 当 `isIncome` 变为 `true` 时，补充获取并刷新 `detailList` 以重新渲染表格。

## 验证与文件
- 验证：src=无锡市区G/001.md
- 文件：VerificationReceiptDetailTable.vue, subTableMixins.js, VerificationReceiptDetailDialog.vue, zs-table-column.vue, assessmentContentItemTable.vue, vite.config.js, assetsLeaseContractFiling/index.vue, resourcesLeaseContractFiling/index.vue
- 会话：08b73ebd-1692-46da-8e18-00b4de13e612；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "async_isincome_dict",
  "source_extraction_id": "6ed84d5124bd4cf1892f22b04bc78398",
  "version": 2,
  "memory_type": "entities"
}
-->