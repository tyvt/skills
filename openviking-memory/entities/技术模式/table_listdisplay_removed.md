# table.js移除listDisplay相关逻辑
在 `zhi2-web-admin/src/mixins/table.js` 中已完成 `listDisplay` 相关逻辑移除，消除无意义的状态与监听。

## 改动内容
- 删除 `data` 中仅用于 `listDisplay` 的状态：`__hasFetchedList`、`__platformDefaultPageSizeValue`
- 删除 `created` 中对 `applyPlatformDefaultPageSize` 的调用
- 删除 `watch` 中 `platformListDisplay` 监听与 `computed` 中 `platformListDisplay`
- 删除 `methods` 中 `applyPlatformDefaultPageSize`
- 清理 `getList` 里 `this.__hasFetchedList = true` 的赋值

## 验证
- 已检查该文件 lint，当前无新增报错

## 关联信息
- 验证证据：extracted source=cursor project=G
- 涉及文件：zhi2-web-admin/src/mixins/table.js
- 来源会话：34cda8b6-4c32-4307-ad22-7aac5244c3dd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_listdisplay_removed",
  "source_extraction_id": "c236da9a3df445bb9d98b7def057c10b",
  "version": 1,
  "memory_type": "entities"
}
-->