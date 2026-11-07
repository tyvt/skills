# 返还明细弹窗切换行数据不刷新修复
惠山G 项目 zhi1-web-admin 中资金返还明细弹窗（`zs-dialog` 设 `modal="false"` 不挡表格），点开第 2 条后不关弹窗直接点第 1 条时，`visible` 一直为 `true`，`@open` 不再触发，表单与明细表停留第 2 条数据。

## 问题根因
- `zs-dialog` 设置 `modal="false"` 不遮挡后方表格，可在不关弹窗情况下点击其他行
- 切换行时 `visible` 保持 `true`，`@open` 不再次触发，`onOpen` 不执行
- `onOpen` 内 `getList()` 未等子组件 props 更新，可能拿到旧 `maintenanceObjectId`

## 修复方案
- `refundDetailTable.vue`：给弹窗加 `:key="currentMaintenanceObjectId"`，切换维修对象时强制重建弹窗；`handleView` 用 `{ ...row }` 拷贝数据避免引用同一对象
- `refundDetailDialog.vue`：抽出 `loadDialogData()`，在 `$nextTick` 中更新表单并调用 `getQuery()` 刷新明细；监听 `maintenanceObjectId`，弹窗已打开时切换行也刷新数据

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：repairFunds/refund/components/refundDetailTable.vue、refundDetailDialog.vue
- 所属项目：惠山G；来源会话：d4844f59-a2f6-4821-94b4-6f91ed2f0ff7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_row_switch",
  "source_extraction_id": "f6174fe7b1f44ced861b7268243dc86a",
  "version": 1,
  "memory_type": "entities"
}
-->