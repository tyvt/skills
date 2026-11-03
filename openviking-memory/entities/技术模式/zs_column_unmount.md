# ZsTableColumn 卸载期异步回写防护
在 zs-table-column.vue 增加 `_zsUnmounted` 标志并兼容 Vue2/Vue3 生命周期，避免卸载后异步回写触发 ElTableColumn 异常。

## 问题根因
- 待办等页离开路由时报 `Unhandled error during execution of beforeUnmount hook`（栈在 ElTableColumn）。
- 常见原因：列组件在字典异步回调或 `computedWidth/getHeader` 里仍在改状态。

## 解决方案
- 在 `zs-table-column.vue` 增加 `_zsUnmounted`，`created` 里字典回写与宽度计算前检查。
- 同时实现 `beforeDestroy` 与 `beforeUnmount`，兼容 Vue2/Vue3 迁移期。

## 验证与归属
- 验证证据：会话 03d38e43：/index/todo 卸载 warn；结论为卸载后仍更新触发 ElTableColumn beforeUnmount 异常。
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue。
- 所属项目：2-0；来源会话ID：03d38e43-915e-4d67-8a3b-63c1ee8a02cf；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_column_unmount",
  "source_extraction_id": "e57735de826b42d4a27e72c858cd941c",
  "version": 1,
  "memory_type": "entities"
}
-->