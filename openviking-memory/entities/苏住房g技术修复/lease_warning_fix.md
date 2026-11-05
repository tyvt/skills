
# 经营用房租赁合同预警勾选与忽略修复
苏住房G(zhi2-web-admin) 经营用房租赁合同（assetsLeaseContractFiling）已备案预警合同的勾选与忽略预警功能已修复。
## 改动要点
- 新增 isWarningContract(row) 统一判断 whetherWarning 为 1/'1'/true 的预警合同
- 更新 isSelectable / setRowStyle 均调用 isWarningContract，已备案预警行可勾选且橙色背景判断一致
- 加固 getIgnore：未勾选提示「请先勾选要忽略预警的合同」；勾了但无预警提示「所选合同中无预警合同，请选择橙色标记的预警合同」；从 tableData 按 revenueContractId 取最新行再过滤避免 reserve-selection 字段不同步
- 忽略预警按钮在选中项中无预警合同时 disabled，减少误点
## 涉及文件与归属
- 文件：benefit/assetsLeaseContractFiling/index.vue、benefit/parkingSpaceContractFiling/index.vue
- 所属项目：苏住房G；来源会话：7960611d-0d3b-4ae8-a217-98664ba2c7a2；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "lease_warning_fix",
  "source_extraction_id": "304462af4c4c464dbde6022d75d9467b",
  "version": 1,
  "memory_type": "entities"
}
-->