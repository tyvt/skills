# 经营用房租赁合同预警勾选与忽略修复
苏住房G(zhi2-web-admin) 经营用房租赁合同（assetsLeaseContractFiling）已备案预警合同的勾选与忽略预警功能已修复。
## 改动要点
- 新增 isWarningContract(row) 统一判断 whetherWarning 为 1/'1'/true 的预警合同
- 更新 isSelectable / setRowStyle 均调用 isWarningContract，已备案预警行可勾选且橙色背景判断一致
- 加固 getIgnore：未勾选提示「请先勾选要忽略预警的合同」；勾了但无预警提示「所选合同中无预警合同，请选择橙色标记的预警合同」；从 tableData 按 revenueContractId 取最新行再过滤避免 reserve-selection 字段不同步
- 忽略预警按钮在选中项中无预警合同时 disabled，减少误点
- 草稿合同仍可勾选用于删除；选中已备案合同时批量删除按钮保持禁用（补充来源会话：19d60287-cf61-42b7-8cdf-70ebe430e846）
## 涉及文件与归属
- 文件：benefit/assetsLeaseContractFiling/index.vue、benefit/parkingSpaceContractFiling/index.vue
- 所属项目：苏住房G；来源会话：7960611d-0d3b-4ae8-a217-98664ba2c7a2、19d60287-cf61-42b7-8cdf-70ebe430e846；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "lease_warning_fix",
  "source_extraction_id": "d5476054ac4b4f1daec0866a22a1a876",
  "version": 2,
  "memory_type": "entities"
}
-->
