# zs-table-column 自定义渲染绕过 tooltip 补齐
园区公共收益弹窗内 zs-table 自定义渲染列截断且无悬浮提示，组件层需补 title 并放宽过窄 width，业务侧过窄固定 width 改 minWidth。

## 现象
- 弹窗内 zs-table 列（如楼幢关联「房屋套数」width:80px）表头被 ellipsis 截成「房屋...」。
- 自定义单元格模板绕过 Element show-overflow-tooltip，长文本（楼幢坐落）无法悬浮查看。

## 根因
- 自定义列宽仍截断且缺 title 属通用补齐问题，与「插槽根节点用 div 被判复杂列定宽 80px」场景不同。

## 修复方案
- 组件层：表头与文本单元格增加 title 展示全文；配置 width 小于表头所需宽度时自动放宽。
- 业务侧：过窄固定 width 改为 minWidth（如房屋套数 90px）。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话 4d5ba10a 物业管理区域授权楼幢关联弹框字段显示不全且不能悬浮，改 BuildingDialogAuth 列宽与 zs-table-column.vue。
- 涉及文件：zs-table-column.vue、BuildingDialogAuth.vue。
- 所属项目：园区公共收益；来源会话：4d5ba10a-398d-499d-aa18-07403294d1a3；代码基线：b6bf87d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_tooltip_title",
  "source_extraction_id": "29c980d82c364957b8a38a2d08250317",
  "version": 1,
  "memory_type": "entities"
}
-->