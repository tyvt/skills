# 房产选择对话框应补全 tree 属性并规范化参数
在 Suzhou Real Estate Monitoring V3 项目中，`HouseSelectDialog.vue` 通过 `buildingSelectTree` 补全 `treeUrl`/`treeKey`/`treeLabel`，并规范化 `findHouseList` 请求。

## 属性补全
- `HouseSelectDialog.vue` 使用 `buildingSelectTree` 来填充 `treeUrl`/`treeKey`/`treeLabel`
- 消除缺失 prop 的警告

## 请求与解析
- `findHouseList` 固定发送 `key:String(projectId)` 和 `buildCode`，兜底使用 `buildingId`
- `parseApiList` 仅解析 array/`rows`/`list`/`data`
- 超出分页时告警截断

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/070.md
- 涉及文件: houseLimitAudit/index.vue, houseLimit/limitAdd.vue, HouseSelectDialog.vue, houseMerge/detail.vue, limitFormMixin.js, zs-select-dialog-func.vue, BuildingTableViewTabs.vue, zs-select-dialog.vue
- 会话: b1e26906-7719-47ec-96f7-a8e3dc7a48fa; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_select_tree",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->