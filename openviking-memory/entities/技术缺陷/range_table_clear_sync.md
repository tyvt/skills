# rangeTable 重置勾选不同步
园区物管2.0 中外部清空 defaultSelectedRangeList 后，rangeTable.vue 内 el-table 仍残留勾选，出现内外不同步。

## 问题根因
- 外部清空 defaultSelectedRangeList 时，组件仅置空 selectedRangeList，未清除 el-table 内部 selection。
- 导致弹窗内表格仍显示旧勾选，与外面已清空状态不一致。

## 解决方案
- 在 rangeTable.vue 的 defaultSelectedRangeList watcher 补充同步逻辑。
- 默认值变 [] 时主动调用 this.$refs.rangeTableRef.clearSelection() 清空表格勾选，并清空 delSelectedIds。
- 默认值非空时先 clearSelection() 再走 setSelectedRange() 回填，避免旧勾选叠加。

## 涉及信息
- 涉及文件：system/message/components/selectRangeDialog.vue、rangeTable.vue、components/zs-table/zs-table.vue、index.vue
- 所属项目：园区物管2.0；来源会话：c6be946b-abae-4b93-9a83-f55f6a1bc67a；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "range_table_clear_sync",
  "source_extraction_id": "42c768a81b7349ffb7ae96dc2517af73",
  "version": 1,
  "memory_type": "entities"
}
-->
