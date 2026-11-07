# 新字段 lv=2 导致资金余额子项缩进不正确
在 mapTipRows 中，3 个字段（例如：本年新增账户数）使用 lv=2 和 padding-left:20px 来模仿收入/支出子项的缩进，导致错位。

## 问题根因
- mapTipRows 中的 3 个字段的 lv 被定义为 2，并使用 padding-left:20px 模仿资金收支的缩进。
- 这导致资金余额子项缩进不正确。

## 解决方案
- 将 lv 改为 1，使其与“资金余额”处于同一级别。
- 调整顺序为：资金余额 → 3 个字段 → 收入/支出 (lv:2)。

## 验证与来源
- 文件: src/views/benefit/mapOverview/index.vue
- 会话: 0c9c218b-0876-4484-af0e-4452a8f8c076; 基础代码: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：0c9c218b-0876-4484-af0e-4452a8f8c076


<!-- MEMORY_FIELDS
{
  "category": "已知缺陷",
  "name": "map_rows_indent",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 1,
  "memory_type": "entities"
}
-->
