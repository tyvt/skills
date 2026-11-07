
# 公共查询小区详情备案入口常驻
淮安物管公共查询小区详情页下各子块备案入口无论是否有数据均须常驻显示的约定。

## 约定
- `publicQuery/complex/detail` 下业委会/物管会、管理主体、开户申请等子块：无论表格是否已有数据，右上角「××备案》」入口始终显示（与 propertyContractTable、buildingTable 一致）。
- 有数据时仍展示表格/详情内容，右上角备案入口不再消失。

## 反模式
- 勿用 `v-if="!hasData"` 或按 `hasIndustryData/hasPropertyData` 隐藏备案按钮。
- 具体移除项：committeeTable 的 `v-if="!hasIndustryData || !hasPropertyData"` 及单个按钮条件判断，并删除 hasIndustryData、hasPropertyData、checkCommitteeDataFlags；managementOrgPanel 与 regulatoryAccountPanel 的 `v-if="!hasData"`。

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/detail.vue（父页）
- zhi2-web-admin/src/views/publicQuery/complex/components/committeeTable.vue（删 hasIndustryData/hasPropertyData/checkCommitteeDataFlags）
- zhi2-web-admin/src/views/publicQuery/complex/components/managementOrgPanel.vue（删 v-if="!hasData"）
- zhi2-web-admin/src/views/publicQuery/complex/components/regulatoryAccountPanel.vue（删 v-if="!hasData"）
- 一致性参考：buildingTable.vue、propertyContractTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：会话 4a4ea16a 用户要求有数据时仍显示前往备案按钮；改 committeeTable、managementOrgPanel、regulatoryAccountPanel。
- 所属项目：淮安物管；来源会话：4a4ea16a-5909-4259-b187-a74d02887a92；代码基线：dc21427
- 验证方式：刷新页面即可验证。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_filing_entry",
  "source_extraction_id": "829524b31da8427facda7c3ea75fe26b",
  "version": 2,
  "memory_type": "entities"
}
-->