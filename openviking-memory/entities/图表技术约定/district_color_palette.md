# 各区图表统一取色 DISTRICT_COLOR 色盘
园区物管2.0 大屏图表统一使用 DISTRICT_COLOR 色盘为行政区维度配色，解决旧主色不统一问题。

## 配色规则
- 饼图与横向柱图均使用 `DISTRICT_COLOR`（江阴 `#3B82F6`、宜兴 `#2BDFFA` 等 7 区色）
- 趋势图折线及双面积图改为对应区色（如 `#3B82F6`、`#EC4899`）
- 业务类别柱图保留单色（`#3B82F6` / `#FFA94D`）

## 问题根因
- 原图表沿用旧主色（如 `#2f7cff`），行政区维度配色未统一

## 验证与归属
- 验证：src=园区物管2.0/055.md
- 涉及文件：fundPanorama/index.vue、fundPanorama/mock.js
- 所属项目：园区物管2.0；来源会话：3f34cc31-619a-4d49-89fa-8ac011406d40

<!-- MEMORY_FIELDS
{
  "category": "图表技术约定",
  "name": "district_color_palette",
  "source_extraction_id": "846d672223cd445ea22af46f3ef6a218",
  "version": 1,
  "memory_type": "entities"
}
-->