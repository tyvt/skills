# 各区图表统一取色 DISTRICT_COLOR 色盘
园区物管2.0 大屏图表统一使用 DISTRICT_COLOR 色盘为行政区维度配色，解决旧主色不统一问题。

## 配色规则
- `DISTRICT_COLOR` 7 区完整色盘：江阴市 `#3B82F6`、宜兴市 `#2BDFFA`、梁溪区 `#FFB95A`、锡山区 `#EC4899`、惠山区 `#A27918`、滨湖区 `#84CC16`、新吴区 `#727EED`
- 饼图「各区收入/支出」与图例、横向柱图「各区账户余额分布图」均取 `DISTRICT_COLOR`（柱图原整图单色 `#2f7cff` 改为每区一根柱）
- 趋势与双系列面积图：租赁申请数/用款申请数折线 `#2f7cff` → `#3B82F6`；合同 vs 入账/支出双面积图合同线/面积用 `#3B82F6` 及渐变，第二条线用 `#EC4899`（锡山区）替代 `#ee5253`
- 业务类别柱图保留单色（收入 `#3B82F6`、支出 `#FFA94D`），因维度为业务类别非行政区

## 问题根因
- 原图表沿用旧主色（如 `#2f7cff`），行政区维度配色未统一

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：src=园区物管2.0/055.md
- 涉及文件：fundPanorama/index.vue、fundPanorama/mock.js
- 所属项目：园区物管2.0；来源会话：3f34cc31-619a-4d49-89fa-8ac011406d40

<!-- MEMORY_FIELDS
{
  "category": "图表技术约定",
  "name": "district_color_palette",
  "source_extraction_id": "b701ffae5f6b4b488b7ce890c4ed9a0e",
  "version": 2,
  "memory_type": "entities"
}
-->