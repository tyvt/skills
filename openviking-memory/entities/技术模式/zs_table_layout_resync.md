# 综合查询小计行错位修复
园区公共收益项目综合查询列表小计行错位到操作列，修复集中在zs-table组件层，未改业务页query/index.vue。

## 问题根因
- 列表布局重同步时机不对，导致列宽、滚动条、loading遮罩未稳定时小计行错位到操作列

## 解决方案
- zs-table.vue：resyncTableLayout改为generation合并重排，重复触发递增generation使旧回调失效；$nextTick+双requestAnimationFrame等布局稳定后执行；抽出run/cancelResyncTableLayout并在beforeDestroy取消
- zs-table-column.vue：watch resolvedMinWidth，数据到达或字典异步加载致min-width变化时主动通知父表格重同步
- table.js（mixins）配套调整

## 验证与归属
- 验证：综合查询列表小计行对齐正常
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/mixins/table.js、query/index.vue（业务页未改）
- 所属项目：园区公共收益；来源会话：e46fb06f-9444-4980-9554-1217995da3ec；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_layout_resync",
  "source_extraction_id": "31fe75b5c4d544939feb0480b86197a7",
  "version": 1,
  "memory_type": "entities"
}
-->