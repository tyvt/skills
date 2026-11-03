# 公共查询小区详情备案入口常驻
淮安物管公共查询小区详情页下各子块备案入口无论是否有数据均须常驻显示的约定。

## 约定
- `publicQuery/complex/detail` 下业委会/物管会、管理主体、开户申请等子块：无论表格是否已有数据，右上角「××备案》」入口始终显示（与 propertyContractTable、buildingTable 一致）。

## 反模式
- 勿用 `v-if="!hasData"` 或按 `hasIndustryData/hasPropertyData` 隐藏备案按钮。
- 有数据时仍展示表格/详情，备案仅作跳转入口。

## 验证与归属
- 验证：会话 4a4ea16a 用户要求有数据时仍显示前往备案按钮；改 committeeTable、managementOrgPanel、regulatoryAccountPanel。
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/components/committeeTable.vue、managementOrgPanel.vue、regulatoryAccountPanel.vue
- 所属项目：淮安物管；来源会话：4a4ea16a-5909-4259-b187-a74d02887a92；代码基线：dc21427

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_filing_entry",
  "source_extraction_id": "c5852556bbb845f685ba8e45ddb255f3",
  "version": 1,
  "memory_type": "entities"
}
-->