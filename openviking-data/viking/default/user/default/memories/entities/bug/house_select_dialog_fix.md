# 限制审核新增房屋弹窗楼盘表修复
苏州市房地产监测V3 修复限制审核「新增房屋」弹窗楼盘表（HouseSelectDialog.vue）多项问题。

## 修复内容
- 增加计算属性 `buildingSelectTree`，补齐 `treeUrl`/`treeKey`/`treeLabel`，避免开发环境 prop 警告
- `findHouseList` 请求体固定带 `key: String(projectId)` 与 `buildCode`；无 `buildCode` 时用 `buildingId` 兜底，仍缺失则提示并中止请求
- 分页截断：当 `total > rows.length` 时提示仅展示前 N 条
- `parseApiList` 去掉 `Object.values` 启发式，只认数组、`rows`、`list` 及 `data` 下同类字段
- 常量注释同步 `findHouseList` 的 `key` + `buildCode` 约定

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`HouseSelectDialog.vue`、`houseLimitAudit/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话：b1e26906-7719-47ec-96f7-a8e3dc7a48fa

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "house_select_dialog_fix",
  "source_extraction_id": "f8bdd9b3412f4342a39559b352c1b670",
  "version": 1,
  "memory_type": "entities"
}
-->