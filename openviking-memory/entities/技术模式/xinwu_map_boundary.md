# 新吴区地图边界坐标更新
`benefit/statisticsMap` 模块 `map.js` 已替换为官方高精度区划边界。

## 变更内容
- 使用官方区划源 `320214`（新吴区）边界坐标，从 580 点抽稀保形至 74 点
- `map.js` 的 `path` 替换为该官方边界数据的多边形点串，显示更贴近真实区界
- 如需更高精度可恢复 580 个原始点（文件更长但精度最高）

## 涉及文件
- `benefit/statisticsMap/components/map.js`
- `benefit/statisticsMap/components/map.vue`
- `components/ZsTencentMap/index.vue`
- `components/ZsTencentMap/mapLoader.js`

## 验证与归属
- 验证证据：extracted source=cursor session=95e2008d-fb62-4d82-a1ce-c691d8ecfd29
- 项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "xinwu_map_boundary",
  "source_extraction_id": "9f333107872e469e979c4d40d93df257",
  "version": 1,
  "memory_type": "entities"
}
-->