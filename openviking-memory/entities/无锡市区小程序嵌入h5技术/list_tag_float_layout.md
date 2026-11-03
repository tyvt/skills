# 列表项前置标签浮动布局
无锡市区小程序嵌入H5中列表项「前置标签+多行标题」用 float:left 标签让换行从整行左侧起而非与标签列对齐。

## 现象与做法
- flex 左右分栏时，公告等列表标题换行后与标签同一列对齐，标签被挤压变形
- 去掉 flex 分栏；标签 float:left 并与标题首行等高（如 52rpx）
- 标题文本紧跟标签参与自然换行，换行后从容器最左开始（标签下方）
- 容器用 max-height 限制最多两行（如 2×行高）
- 适用于 pages_owner/project/announcement 等同构列表

## 验证与归属
- 验证会话：ef68441e-686a-4599-93bd-59b2f361614d（基线 0804e57）
- 涉及文件：src/pages_owner/project/announcement/index.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "list_tag_float_layout",
  "source_extraction_id": "ebbf4b220692482fb080e0c398f71fe7",
  "version": 1,
  "memory_type": "entities"
}
-->