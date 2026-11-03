# 防汛历史记录页有数据不显示
防汛C端历史记录页因 fetchHistoryRemote 未带阶段参数致客户端过滤清空列表的分页 Bug。

## 问题根因
- `fetchHistoryRemote` 请求 `/inspection/page` 未带 `inspectionStage`，后端按全局分页返回跨阶段数据
- 前端按当前页签 kinds 客户端过滤，第1页恰为其他阶段时全部被过滤为空
- `total` 取过滤后 `records.length`（0）而非后端真实 `total`，z-paging 误判无数据

## 解决方案
- 按阶段分别请求 `/inspection/page?inspectionStage=<STAGE>&subject=property`，后端做阶段过滤
- `total` 改用后端返回真实 `total`，`hasMore = pageNum*pageSize < total`
- 计数只取 `total`（`pageSize=1`），不再为计数拉 1000 条

## 验证与归属
- 验证：vue-tsc 类型检查通过、单测 20 passed、bun run build:h5 成功（2026-11-03）
- 涉及文件：src/stores/flood.ts
- 所属项目：苏住房防汛C端；来源会话：2026-11-03 排查「有数据没展示」

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flood_stage_filter",
  "source_extraction_id": "e9e7198dbcec44afa5bfd12d3f22d6a3",
  "version": 1,
  "memory_type": "entities"
}
-->