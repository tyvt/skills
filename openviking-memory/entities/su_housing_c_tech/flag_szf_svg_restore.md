# 标志SVG文件丢失恢复
苏住房C项目中 `flag-szf.svg` 丢失导致 `ResultStatistics.vue` 与 `StepConfirm.vue` 构建告警，已从历史提交恢复。

## 问题根因
- `ResultStatistics.vue` 和 `StepConfirm.vue` 引用 `pages_owner/static/images/svg/flag-szf.svg`
- 该文件曾在历史提交存在，当前工作区缺失，构建报 "didn't resolve at build time"

## 修复内容
- 从提交 `266eadbb` 恢复 `flag-szf.svg`
- 重新构建后两条 WARN 消失

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`ResultStatistics.vue`、`StepConfirm.vue` 及对应 SVG 路径
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0a4a1e3a-c1d1-4977-b31d-897f98dd9f49；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "flag_szf_svg_restore",
  "source_extraction_id": "b1410b6d519f499da0178d453601d9b1",
  "version": 1,
  "memory_type": "entities"
}
-->