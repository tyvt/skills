# 弹窗打开时接口重复调用修复
惠山G 项目 zhi1-web-admin 中 refundDetailDialog 打开弹窗时接口重复调用，已修复为每次打开仅请求一次。

## 问题根因
- `onOpen` 和 `maintenanceObjectId` 的 watch 都会调用 `loadDialogData()` → `getQuery()`，在 `handleView` 同时设置 id 和 `visible` 时可能各触发一次
- `loadDialogData` 用 `$nextTick` 调 `getQuery`，和 `v-if` 挂载 `commonTable` 的时序叠在一起容易出现重复请求

## 解决方案
- 去掉 `maintenanceObjectId` 的 watch 和 `loadDialogData`
- `onOpen` 只负责填充表单，不再请求接口
- `commonTable` 在 `autoQuery=false` 时于 `mounted` 中调用一次 `getQuery()`
- 配合 `v-if="$attrs.visible"`，每次打开挂载一次、请求一次

## 预期请求
- `getDicts`（字典）1 次、`getBuilding`、`getUnit`、`listRefundObjShare` 各 1 次

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：refund/components/refundDetailDialog.vue、refundDetailTable.vue
- 所属项目：惠山G；来源会话：69fe4877-9065-40ce-b4bb-17b22cfdb965；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_api_bug",
  "source_extraction_id": "620ae39c66f049e4bb469a7490ac0c83",
  "version": 1,
  "memory_type": "entities"
}
-->