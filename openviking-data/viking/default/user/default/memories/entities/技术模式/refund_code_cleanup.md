# refund 目录冗余代码清理
惠山G 项目 zhi1-web-admin 中 refund 目录下 commonTable.vue 与 refundDetailTable.vue 完成冗余代码清理，功能逻辑保持不变。

## commonTable.vue 变更
- 组件名 `RefundDetailDialog` 修正为 `CommonTable`
- 移除未使用的 `dialogForm` prop、`isFormDisabled` 计算属性、`autoQuery` prop、`dialogFormMode` 状态
- 移除传给 selectBuildingDialog 的无效属性（`dialog-form`、`dialog-form-mode`）及无效的 `@getList` 监听
- 合并生命周期：`created` 仅加载字典，`mounted` 统一触发 `getQuery()`
- 删除与 listMixins 重复的 `total` 定义，修正 `setData` 中逗号运算符写法

## refundDetailTable.vue 变更
- 移除未使用的 `purposeOptions`、`total` 及 `initDict` 方法（模板未引用字典）
- 移除重复的 `created()` 钩子，改由 listMixins 统一调用 `init()`
- 移除 `refundDetailDialog` 上无效的 `@getList` 监听

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：refund/components/commonTable.vue、refundDetailTable.vue、refundDetailDialog.vue
- 所属项目：惠山G；来源会话：730dd1cd-f8d3-4003-a2f1-4eb7db405ae1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_code_cleanup",
  "source_extraction_id": "620ae39c66f049e4bb469a7490ac0c83",
  "version": 1,
  "memory_type": "entities"
}
-->