# zs-table-column switch 列双坑：表头截断与空 tooltip
[苏房G] zs-table-column 的 type="switch" 列因固定宽 60px 与默认开启 showOverflowTooltip，同时出现表头被截与空黑 tooltip 两处独立问题。

## 现象
- 工单分类等页面用 zs-table-column type="switch" 渲染「状态」开关列，表头显示成「...」省略号。
- 鼠标悬停开关时弹出一个空的黑色 tooltip 框。

## 根因
- switch 类型列被钉死固定宽 60px，表头样式带 text-overflow: ellipsis，中文「状态」两字放不下被截。
- 所有列默认开启 showOverflowTooltip；switch 列无文本内容，Element UI 仍按溢出判定触发 tooltip，空内容渲染黑框。
- 两处独立根因都在公共列组件 zs-table-column.vue，不在业务页面。

## 修复方案
- 组件层把 switch 分支固定宽从 60px 提到 88px（够放「状态」+ 开关）。
- 对 switch 类型强制 showOverflowTooltip=false。
- 两处必须一起改，只改宽度会让「...」消失但黑色空框依旧。

## 验证与归属
- 验证：会话 1cc96294 工单分类状态栏省略号 + 黑色空提示，根因在公共组件非业务页。
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/views/property/workOrder/category/index.vue。
- 所属项目：苏住房G；来源会话：1cc96294-89aa-419f-a3f0-3c4fbc943d76；代码基线：e590ffa。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_switch",
  "source_extraction_id": "ea2994fc67214b8b8e95709cd8977d46",
  "version": 1,
  "memory_type": "entities"
}
-->