# zs_table_resync_fix
园区公共收益项目综合查询列表小计行错位到操作列，通过调整 zs-table 布局重同步机制在组件层修复。

## 问题根因
- 综合查询列表小计行错位到操作列
- 列宽、滚动条、loading 遮罩等布局未稳定时执行了表格布局同步

## 解决方案
- zs-table.vue：resyncTableLayout 由「丢弃并发调用」改为 generation 合并重排，重复触发时递增 generation，旧回调自动失效
- 同步时机改为 $nextTick + 双 requestAnimationFrame，等布局稳定后再执行
- 抽出 runResyncTableLayout / cancelResyncTableLayout，在 beforeDestroy 中取消待执行同步
- zs-table-column.vue：对弹性列 watch resolvedMinWidth，字典异步加载导致 min-width 变化时主动通知父表格重同步
- table.js（mixins）：配套调整

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：综合查询列表小计行对齐正常
- 涉及文件：src/components/zs-table/zs-table.vue、zs-table-column/zs-table-column.vue、src/mixins/table.js；业务页 query/index.vue 未修改
- 所属项目：园区公共收益；来源会话：e46fb06f-9444-4980-9554-1217995da3ec；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_resync_fix",
  "source_extraction_id": "e1adb89c6aad4357a6a61f939a5b1749",
  "version": 1,
  "memory_type": "entities"
}
-->