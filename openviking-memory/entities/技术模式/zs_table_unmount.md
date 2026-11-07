# zs-table-column 卸载保护
在 ZsTableColumn 组件增加卸载标记与生命周期兼容，避免卸载后状态更新引发 beforeUnmount 异常。

## 问题根因
- 组件或表格开始卸载后，字典异步回写、computedWidth/getHeader 仍触发状态更新
- 引发 ElTableColumn 的 beforeUnmount 阶段异常（Unhandled error during execution of beforeUnmount hook）

## 解决方案
- 增加 `_zsUnmounted` 标记，在 created() 字典异步回写及 computedWidth/getHeader 中做保护
- 同时实现 beforeDestroy 与 beforeUnmount，兼容 Vue2/Vue3 迁移阶段
- 修改文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证方式：切换路由离开触发卸载，观察控制台是否仍出现 beforeUnmount hook 报错
- 所属项目：2-0；来源会话ID：03d38e43-915e-4d67-8a3b-63c1ee8a02cf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_unmount",
  "source_extraction_id": "bfd013e391d9471ea436a5f588e52aad",
  "version": 1,
  "memory_type": "entities"
}
-->