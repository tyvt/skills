# mapOverview 余额排名表头左对齐修复
园区物管2.0 的 benefit/mapOverview/index.vue 修复了余额排名表头与数据未左对齐的问题。

## 问题根因
- 表头 `.balance-rank__head` 与各行 `.balance-rank__row` 各自使用独立 grid，第三列 `auto` 按本行内容算宽，导致表头「余额（元）」与下方数字起始位置不一致

## 改动内容
- 在 `.balance-rank` 上定义统一列宽变量 `--balance-rank-grid-cols: 28px minmax(48px, 1fr) 72px`
- 表头与数据行共用该定义，余额列固定 72px 并左对齐，表头与数据左边缘对齐
- 若后续出现更长金额（如百万级），可将 `72px` 适当调大

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：2aa6472f-742a-4bc7-bb9f-76eedbe8d7a9

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "rank_align_fix",
  "source_extraction_id": "002609c992b548f3a2fb6c81c8304007",
  "version": 1,
  "memory_type": "entities"
}
-->