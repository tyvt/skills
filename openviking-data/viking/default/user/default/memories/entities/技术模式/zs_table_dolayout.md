# 弹窗内zs-table重置搜索后末行裁切修复（listTableTr不变跳过doLayout）
在ScopeSelectDialog内嵌zs-table时，若计算listTableTr与上次相同则跳过doLayout，重置搜索后行数恢复但内部滚动高度未重算致末行裁切。

## 问题根因
- updateListTableTr在listTableTr与上次相同时直接return，未在$nextTick调用表格doLayout
- 搜索→重置后行数回到初次一致，但内部滚动区域高度仍按少行状态未重算

## 解决方案
- 数据刷新后无论listTableTr是否变化都在$nextTick执行doLayout
- resetQuery统一走handleQuery()保证pageNum=1并与listMixins重置链路一致
- 偶发时在getList回调用requestAnimationFrame双帧再doLayout
- 与「table-tr固定行数契约+异步后doLayout」互补：行数契约值不变时也不能省略布局重算

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话acf40130中ScopeSelectDialog.vue去掉listTableTr不变即return，重置改调handleQuery；搜索后重置再滚到底检查末行完整
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue、zhi2-web-admin/src/components/zs-table/zs-table
- 所属项目：园区公共收益；来源会话：acf40130-9dda-4c08-b943-34292e01cab4；代码基线：弹窗内zs-table+table-tr定高场景

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_doLayout",
  "source_extraction_id": "14ba31c6dc8f4d5282d0b9f4f6413e26",
  "version": 1,
  "memory_type": "entities"
}
-->