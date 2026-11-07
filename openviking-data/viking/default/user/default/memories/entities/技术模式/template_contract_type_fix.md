# 范本跳转合同页传递合同类型修复
禅道#6328 修复范本「范本内容」误进现售签订的问题，通过在范本跳转路由 query 中显式传递 contractType 区分预售与现售。

## 问题根因
- 苏州2016版 `contract/index.vue` 的 `contractType` 仅靠菜单 meta 标题或路径 `/cash` 判断
- 从范本跳入时 meta 常无「预售/现售」标识，导致合同类型判断错误、范本内容误进现售签订

## 修复内容
- 范本 `gotoContractTemplate` 的 router query 增加 `contractType`（参数名 `wq_presale_contractType`，0=预售，1=现售）
- 合同页 `comeFromTemplate` 时优先读取 query 中的 `contractType`

## 代码归属
- 子模块提交：`cdd058231`（父 `79ae314e0`），父提交 `8037426`
- 来源工单：禅道#6328
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "template_contract_type_fix",
  "source_extraction_id": "6b54932a2fab4204ad9039ac3d07905e",
  "version": 1,
  "memory_type": "entities"
}
-->