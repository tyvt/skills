# 返还明细弹窗首次打开无数据修复
惠山G 项目 zhi1-web-admin 中返还明细弹窗因 `:key="currentMaintenanceObjectId"` 导致首次打开（挂载即打开）不触发 `@open`，`onOpen()` 不执行，`form` 为空；第二次打开 `visible` false→true 才正常显示。

## 问题根因
- 父组件 `refundDetailTable.vue` 给弹窗加 `:key="currentMaintenanceObjectId"`
- 首次点「返还明细」时 `currentMaintenanceObjectId` 由 `undefined` 变具体 ID，弹窗组件销毁重建，新建时 `visible` 已为 `true`
- Element UI `el-dialog` 挂载时即为打开状态不会触发 `@open`，故 `onOpen()` 未执行，`form` 一直初始空值

## 修复方案
- 增加 `dialogForm` 的 `watch`（`immediate: true`），组件创建时即把数据同步到 `form`
- 保留 `onOpen` 用于后续重复打开场景
- 修正 `::disabled` 笔误为 `:disabled`

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：repairFunds/refund/components/refundDetailDialog.vue、refundDetailTable.vue
- 所属项目：惠山G；来源会话：1261540d-7b00-4143-aefd-bd8ea9034677；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_open_nodata",
  "source_extraction_id": "f6174fe7b1f44ced861b7268243dc86a",
  "version": 1,
  "memory_type": "entities"
}
-->