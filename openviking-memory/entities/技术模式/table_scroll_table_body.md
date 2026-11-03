
# 表格滚动改为整体 table-body 而非每行独立滚动
抽屉/Tab 固定高度布局里，把滚动放在每行上会出现多个滚动条且被裁切，应移到表体。
## 问题根因
- 抽屉/Tab 固定高度布局里，把 max-height+overflow-y 放在每行 name-grid 上会出现「每行一个滚动条」
- 每行滚动条会被外层 overflow:hidden 裁切
## 解决方案
- 把 overflow-y:auto 与 max-height 移到表体（&__table-body）
- 容器设 display:flex;flex-direction:column 让表头不随滚动，表头加 position:sticky; top:0
## 验证与归属
- 011.md 会话 e780a0dd/1fb2d557：operatingAssets 滚动从 name-grid 移到 table-body，flex column 分离表头
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话ID：e780a0dd-fe30-4f74-9569-c9d33cce3fc1, 1fb2d557-1e32-434c-916c-0095fdd829ee；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_scroll_table_body",
  "source_extraction_id": "7cb162820bf54c0cb79063c7eae44880",
  "version": 1,
  "memory_type": "entities"
}
-->