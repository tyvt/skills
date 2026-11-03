# 底部 Grid 列比例调整
园区物管2.0 地图概览页底部一行 CSS Grid 原列比例不当，导致右侧账户余额排名区域过窄，已调整列比例。

## 问题根因
- 底部一行 CSS Grid 原列比例为 `1.12fr 0.88fr`，导致右侧「物业管理区域账户余额排名」仅占约 44%

## 解决方案
- 调整为 `1fr 1.22fr` 使右侧列略宽于左侧
- 必要时可微调至 `1.28fr`~`1.35fr` 以进一步加宽

## 验证与归属
- 验证：src=园区物管2.0/055.md
- 涉及文件：mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：1063d8bb-91e2-41cc-a94c-d70270312b59

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "grid_column_ratio_fix",
  "source_extraction_id": "846d672223cd445ea22af46f3ef6a218",
  "version": 1,
  "memory_type": "entities"
}
-->