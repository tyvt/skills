# 弹窗表格选中项与外部默认值同步
园区物管2.0 中弹窗表格（rangeTable.vue）清空外部默认数组不会清掉 el-table 内部勾选，watch 须 clearSelection 再回填。

## 问题根因
- 外部重置搜索把 defaultSelectedRangeList prop 清为 []，但内部 selectedRangeList 置空不影响 el-table 内部 selection 状态。
- el-table 勾选是自身内部状态，data 数组变化不自动反写勾选，必须显式调实例方法。
- 默认值非空时也可能旧勾选叠加。

## 解决方案
- defaultSelectedRangeList 的 watcher 中：变为 [] 时主动调 this.$refs.rangeTableRef.clearSelection() 并清 delSelectedIds 等辅助集合。
- 非空时先 clearSelection() 再逐行 toggleRowSelection/setSelectedRange 回填，保证先清后设。
- 任何「外部数据源 ↔ 弹窗表格勾选」组件都走此契约。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/system/message/components/rangeTable.vue、selectRangeDialog.vue、index.vue、zhi2-web-admin/src/components/zs-table/zs-table.vue。
- 验证证据：src=园区物管2.0/042.md
- 所属项目：园区物管2.0；来源会话：c6be946b-abae-4b93-9a83-f55f6a1bc67a；代码基线：7814a0c2a。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_table_selection_sync",
  "source_extraction_id": "064aa8abd4864c4c910fd19e1e0dd59b",
  "version": 2,
  "memory_type": "entities"
}
-->
