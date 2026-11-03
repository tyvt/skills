# 合同add模式带ID不补拉主信息避免重请求
contract/index.vue 的 getDetail() 删除 add 模式带 contractId 补拉 getContractMainInfo 代码块，消除首次签订新增多余请求。

## 变更要点
- getDetail() 删除 add 模式带 contractId 补拉 getContractMainInfo 代码块（原 485–491 行）
- 保留 462 行缺参兜底补全与 512 行非 add 详情查看调用

## 收益
- 消除首次签订新增时的多余请求

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/304.md
- 涉及文件：views/contract/index.vue、commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：19a8852d-b130-4562-9dfb-d9339575fa79；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_add_skip",
  "source_extraction_id": "44503dfe3d384a8da633982d1828183f",
  "version": 1,
  "memory_type": "entities"
}
-->