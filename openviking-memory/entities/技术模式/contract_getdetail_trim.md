# 合同详情页移除冗余接口调用
苏州市房地产监测V3 中 `src/views/contract/index.vue` 的 `getDetail()` 在 add 模式带 contractId 时不再补拉 `getContractMainInfo`。

## 改动要点
- 删除 add 模式下带 contractId 时补拉 `getContractMainInfo` 的代码块（原 485–491 行），首次签订新增进入不再多发一次请求
- 保留 462 行：add 模式下缺 projectCode/buildCode 时的兜底补全
- 保留 512 行：非 add 的合同详情查看

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/contract/index.vue、commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：19a8852d-b130-4562-9dfb-d9339575fa79；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_getdetail_trim",
  "source_extraction_id": "eb974d84ed2446a982b5539521f0ce63",
  "version": 1,
  "memory_type": "entities"
}
-->