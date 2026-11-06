# 委托代售楼幢列表删除按钮修复
苏州市房地产监测V3 中委托代售详情页 `EntrustBuildingTable.vue` 的行内删除按钮无效问题已修复。

## 根因
- `zs-table-column` 通过 `:scope="scope"` 透传插槽参数，父组件需用 `slot-scope="{ scope }"` 解构
- 原先写成 `slot-scope="scope"` 直接访问 `scope.row` 得到 `undefined`，确认删除因 `row.id` 报错被 `.catch(() => {})` 静默吞掉

## 修改内容
- `EntrustBuildingTable.vue` 操作列插槽改为 `slot-scope="{ scope }"`
- 删除按钮增加 `data-testid="entrust-sale-building-delete-btn"`
- `handleDelete` / `handleBatchDelete` 增加 `id` 校验、`res.code` 检查，取消确认时不再吞掉其他错误

## E2E 与归属
- 新增 `deleteBuildingByRowButton` 辅助函数，全流程用例覆盖行内删除与批量删除两种路径
- 涉及文件：`EntrustBuildingTable.vue`、`e2e/presale/entrust-sale-real-api-flow.spec.js`、`presale/entrustSale/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：ad31939a-64bd-4cd1-bc4c-21c4d54679cd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_delete_fix",
  "source_extraction_id": "828ec5e928bc4e768c9341b93118b60e",
  "version": 1,
  "memory_type": "entities"
}
-->