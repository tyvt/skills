# table.js移除listDisplay旧逻辑
在 `zhi2-web-admin/src/mixins/table.js` 中删除了 `listDisplay` 相关废弃逻辑，lint 无新增报错。

## 问题根因
- 存在废弃的 `listDisplay` 相关状态、`created` 调用、`watch` 监听、`computed` 属性、`methods` 方法及 `getList` 中的赋值

## 解决方案
- 删除 `__hasFetchedList`、`__platformDefaultPageSizeValue` 状态
- 移除 `created` 调用、`watch` 监听、`computed` 属性、`methods` 方法及 `getList` 中的赋值
- 消除废弃逻辑，lint 无新增报错

## 验证与归属
- 验证证据：extracted source=cursor session=34cda8b6-4c32-4307-ad22-7aac5244c3dd
- 涉及文件：zhi2-web-admin/src/mixins/table.js
- 来源会话ID：34cda8b6-4c32-4307-ad22-7aac5244c3dd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_js_listdisplay",
  "source_extraction_id": "f73dc77955f14b0ab4b4e23663c92a82",
  "version": 1,
  "memory_type": "entities"
}
-->