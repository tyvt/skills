# 经纬度字段未数值化致小区点不显示
zhi2-web-admin 中经纬度字段名不一致且非数值，导致坐标被过滤或打点失败、小区点不显示。

## 问题根因
- `statisticsMap/index.vue` 的 `normalizeProjectList` 中经纬度字段名不一致（`lat/lng` 与 `latitude/longitude`）
- 字段值非数值类型，未做 `Number()` 化与 `Number.isFinite` 校验，导致坐标被过滤或打点失败

## 解决方案
- `normalizeProjectList` 兼容 `lat/lng` 与 `latitude/longitude`，统一 `Number()` 化并校验 `Number.isFinite`
- 对 `projectName` 做兜底处理
- `components/map.vue` 打点前再次兼容转换并跳过非法坐标

## 验证与归属
- 验证证据：src=产品2.0/076.md
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue、mock.js、mockApi.js、operatingAssets.vue、src/components/ZsTencentMap/index.vue、mapLoader.js
- 所属项目：园区物管2.0；来源会话：4e071976-4604-4c8f-972d-87c97674c807；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "coord_not_numericized",
  "source_extraction_id": "cf643038b5164e918e636fbbab3a205f",
  "version": 1,
  "memory_type": "entities"
}
-->