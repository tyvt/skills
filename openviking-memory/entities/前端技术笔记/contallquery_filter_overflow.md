# contAllQueryList 筛选操作区固定宽换行左溢
宿迁存量房 contAllQueryList.vue 新增筛选条件后，固定宽度占位项把操作区挤到下一行；操作区 19% 宽度小于四个按钮总宽，flex-end 布局使按钮向左溢出。移除固定占位并让搜索操作区宽度随内容自适应即可修复。

## 现象
- contAllQueryList.vue 新增筛选条件后，固定宽度占位项把操作区挤到下一行。
- 操作区 19% 宽度小于四个按钮总宽，flex-end 布局使按钮向左溢出，搜索按钮被挤出可视范围。

## 根因
- 操作区存在固定宽度占位项，挤占布局导致换行。
- 操作区写死 19% 宽度且用 flex-end 对齐，当按钮总宽超过 19% 时向左溢出。

## 修复方案
- 移除固定占位项，不再用固定宽度占位。
- 让搜索操作区宽度随内容自适应（width: auto / fit-content），避免搜索按钮被挤出可视范围。

## 关联信息
- 涉及文件：D:/repository/宿迁存量房/src/views/stokeRoomOnlineSignSys/contMa/contAllQuery/contAllQueryList/contAllQueryList.vue、contAllQueryList.js、D:/repository/宿迁存量房/src/style/css/components/_zsForm.scss
- 所属项目：宿迁存量房
- 来源会话：45467d24-df3c-46c2-b102-4fc451dfc34d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "contallquery_filter_overflow",
  "source_extraction_id": "0e1b66671f3d44c9959d94e306a3a8ef",
  "version": 1,
  "memory_type": "entities"
}
-->