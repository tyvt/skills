# zs-table 列宽因自动反馈导致的死循环
在 园区物管2.0 项目中，zs-table 自定义的列宽分配引擎在读取渲染结果并重写布局时，导致与 el-table 的同步循环。

## 问题背景
- 在像 pubElevMaintenanceNew 这样的页面中触发同步循环：表格冻结，列不展开；固定 width 可规避但卡顿不消失
- 原因：distributeColumnWidths 使用渲染后的 realWidth 来计算剩余空间并重新分配 flex 列；输入依赖于输出，lastDistributeKey 不稳定，再加上 ResizeObserver/watch/:key 创建了循环

## 解决方案
- 重构为“仅测量内容，让 el-table 原生 fit”：zs-table-column 使用纯 computed + canvas 按文本测量 contentWidth，仅作为 min-width，绝不读取布局
- 移除 zs-table 中的分配引擎（约90行），仅保留 flexColumnCount；zs-operate-column 变为纯 computed，无 watch/mounted
- 约定：显式 width 固定，显式 min-width 为 max(显式,内容)，无 width 则通过原生 flex 使用内容作为 min-width，固定列 fit:false 不拉伸最后一列

## 教训
- 任何“读取渲染并重写布局”的宽度算法都会与 el-table 形成循环；使用 canvas 测量文本 + 委托 min-width

## 相关信息
- 涉及文件: zs-table.vue, zs-table-column.vue, zs-operate-column.vue, pubElev

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_width_loop",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->