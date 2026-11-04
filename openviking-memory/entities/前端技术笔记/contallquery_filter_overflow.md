# contAllQueryList 筛选操作区固定宽换行左溢
宿迁存量房 contAllQueryList.vue 新增筛选条件后，固定宽度占位项把操作区挤到下一行；操作区 19% 宽度小于四个按钮总宽，flex-end 布局使按钮向左溢出。移除固定占位并让搜索操作区宽度随内容自适应即可修复。

## 现象
- contAllQueryList.vue 新增「推送状态」后筛选条件从 10 个变 11 个；固定宽占位项 `<el-form-item style="width:76%">`（18% 宽 + 2% 右边距 = 第 3 行占 98%）加新项 20% 撑满第 3 行，把 `.search` 挤到第 4 行。
- 操作区 19% 宽度（≈330px）小于四个按钮（搜索/重置/批量导入查询/导出excel表格）最小总宽 ≈380px，flex-end 布局使按钮向左溢出，搜索按钮被挤出可视范围。
- 图标字体未加载时字形变宽（截图 `þ^`、`^` 乱码），溢出更多，搜索按钮彻底消失。

## 根因
- 操作区存在固定宽度占位项 `<el-form-item style="width:76%">`，挤占布局导致换行到下一行。
- 操作区写死 19% 宽度（≈330px）且用 flex-end 对齐、不可换行，按钮最小总宽 ≈380px 超过盒子时向左溢出，第一个按钮「搜索」被推出可视区。

## 修复方案
- 移除固定占位项 `<el-form-item style="width:76%">`，不再用固定宽度占位（仅改 contAllQueryList.vue 一处）。
- 新增 scoped 覆盖：`#contAllQueryList .table-search .search { flex: 0 1 auto; width: auto; flex-wrap: wrap; }` 让搜索操作区按内容自适应，避免搜索按钮被挤出可视范围。

## 关联信息
- 涉及文件：D:/repository/宿迁存量房/src/views/stokeRoomOnlineSignSys/contMa/contAllQuery/contAllQueryList/contAllQueryList.vue、contAllQueryList.js、D:/repository/宿迁存量房/src/style/css/components/_zsForm.scss、netSignFilingsList.vue 及多个列表页；截图 C:\Users\Administrator\.workbuddy\clipboard-images\clipboard-2026-10-12T01-11-27-387Z-fc7c6512.png
- 所属项目：宿迁存量房
- 来源会话：45467d24-df3c-46c2-b102-4fc451dfc34d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "contallquery_filter_overflow",
  "source_extraction_id": "9a7f9d988a2f47b5b80df8c093d2ffce",
  "version": 2,
  "memory_type": "entities"
}
-->