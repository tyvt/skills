# 产品2.0表格行悬停色统一
产品2.0 项目统一 zs-table 及固定列、操作列的悬停背景色为 #f5f7fa，消除列表页不一致。

## 问题原因
- 列表页 zs-table 悬停背景色为 #f5f7fa，但 zs-operate-column 将操作列单元格强制设为 #ffffff，悬停时操作列不变色。
- 悬停 class 只加在主表体行上，左侧/右侧固定列未同步悬停状态。

## 修改内容
- variables.css 新增全局变量 --table-row-hover-background-color: #f5f7fa。
- element-ui.scss 统一所有 el-table 悬停样式，覆盖主表体、固定列、选中行悬停优先级。
- zs-operate-column.vue 操作列在悬停/选中时跟随行背景色。
- zs-table.vue 悬停时同步主表体与所有固定列的 hover-row 状态（含从固定列触发）。

## 验证与归属
- 涉及文件：variables.css、element-ui.scss、zs-operate-column.vue、zs-table.vue。
- 验收：列表页、详情子表、弹窗内表格、带固定操作列的表格悬停背景色均统一为 #f5f7fa。
- 所属项目：产品2.0；来源会话：80a5b505-898c-436f-8ccc-b4d6fd8cd107；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_row_hover_unify",
  "source_extraction_id": "a75d7e23582d403c85e4b150a612f382",
  "version": 1,
  "memory_type": "entities"
}
-->