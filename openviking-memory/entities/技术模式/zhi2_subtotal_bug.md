# zs-table小计数字落到固定操作列修复
园区公共收益综合查询等列表因element-ui 2.15.13列宽同步时序问题，小计金额偶发显示在操作列。

## 问题根因
- 表头/表体/合计行依赖layout observer写colgroup，内部`__updated__`闩锁只在mounted与首次updated同步列宽
- 数据到达后弹性列重测、滚动条出现、固定列激活，合计行重渲染未再`notifyObservers('columns')`会停过期布局
- 仅1条数据时zs-table自动高度分支历史不调doLayout

## 解决方案
- `zs-table.vue`增加去抖`resyncTableLayout()`(nextTick后`table.doLayout()`+`table.layout.notifyObservers('columns')`+滚动条偏移同步)
- 在data变化、containerHeight变化、滚动条显隐、有小计updated、自动高度分支数据变化等时机调用
- 该修复覆盖所有带小计+固定操作列的列表

## 验证与归属
- 修复改动约+31/-4行；涉及文件：src/components/zs-table/zs-table.vue、src/views/maintenance/query/index.vue、projectNameExampleDialog.vue
- 所属项目：园区公共收益；来源会话：8cf85830-9fc8-4151-9f52-885208388c12、797b8ce9-32a7-41fc-8031-23d0a604bf9a；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_subtotal_bug",
  "source_extraction_id": "03289f07c5334576ab4bc228a9de1fd1",
  "version": 2,
  "memory_type": "entities"
}
-->