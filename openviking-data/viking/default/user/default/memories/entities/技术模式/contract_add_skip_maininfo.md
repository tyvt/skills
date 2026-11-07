# 签订新增模式移除补拉合同主信息请求
苏州市房地产监测V3 中 contract/index.vue 的 getDetail() 删除 add 模式带 contractId 时补拉 getContractMainInfo 的冗余代码块。

## 实现要点
- `src/views/contract/index.vue` 的 `getDetail()` 删除 add 模式带 contractId 时补拉 `getContractMainInfo` 的冗余代码块（原 485–491 行），首次签订新增不再多发请求
- 保留 462 行缺码兜底补全与 512 行非 add 详情查看调用

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/103.md
- 涉及文件：zhi2-web-admin/src/views/contract/index.vue、commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：19a8852d-b130-4562-9dfb-d9339575fa79；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_add_skip_maininfo",
  "source_extraction_id": "3a29ac9907f94022a22fb0ef67802f2f",
  "version": 1,
  "memory_type": "entities"
}
-->