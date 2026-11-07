# zs-table并发重排失效修复
园区公共收益(zhi2-web-admin)表格布局同步原先丢弃并发调用，致小计行错位至操作列。

## 问题根因
- 表格布局同步原采用丢弃并发调用机制
- 列宽或异步字典加载致 min-width 变化时未稳定重排，小计行错位至操作列

## 解决方案
- zs-table.vue 将 resyncTableLayout 改为 generation 合并重排，配合 $nextTick 与双 requestAnimationFrame 执行
- zs-table-column.vue 通过 watch resolvedMinWidth 主动触发父表格重同步

## 涉及文件
- zhi2-web-admin/src/components/zs-table/zs-table.vue、zs-table-column.vue
- zhi2-web-admin/src/views/maintenance/query/index.vue
- zhi2-web-admin/src/mixins/ListTemplate.js、listMixins.js
- zhi2-web-admin/public/assets/js/element-ui.js

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：src=园区公共收益/015.md；涉及 .workbuddy/memory/2026-09-11.md、MEMORY.md
- 来源会话ID：e46fb06f-9444-4980-9554-1217995da3ec；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_layout_resync",
  "source_extraction_id": "b3c359ee43174392b704337490851bd2",
  "version": 1,
  "memory_type": "entities"
}
-->