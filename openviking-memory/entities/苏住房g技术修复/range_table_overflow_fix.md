# 表格末行被裁切修复
苏住房G(zhi2-web-admin) 分页表格最后一行被 overflow:hidden 裁掉半边，因表格高度手动计算与 flex 布局偏差，已改用 fill-height 修复。

## 问题根因
- 表格高度此前为手动计算，与 flex 布局实际分配空间有偏差，表格略超出容器
- 最后一条记录被容器 overflow:hidden 裁掉半边

## 修复方案
- rangeTable.vue：表格增加 fill-height，移除手动 tableHeight 计算；table-container 改 flex 纵向布局，表格占满剩余空间、分页固定底部
- selectRangeDialog.vue：移除不再需要的手动高度重算逻辑
- 刷新后最后一行完整显示，分页保持在底部

## 涉及文件与归属
- 文件：system/message/service 下 rangeTable.vue、selectRangeDialog.vue、system/message/components/index.vue
- 所属项目：苏住房G；来源会话：0b5e17ad-9c03-49d8-a182-38e4dddc07e6

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "range_table_overflow_fix",
  "source_extraction_id": "7fa17d8bd2df458083f43c28cf14a90a",
  "version": 1,
  "memory_type": "entities"
}
-->
