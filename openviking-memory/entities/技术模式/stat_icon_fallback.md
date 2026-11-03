# 统计地图资产图标兜底匹配
统计地图(operatingAssets)用 STAT_ICON_MAP 将资产类别 label 映射到本地图标，未对上时按扩展关键词兜底。

## 问题背景
- 资产类别 label 如「饮水/净水机」未直接命中 STAT_ICON_MAP 时，原兜底仅 includes("饮水机")。
- 新增资产类型时若 label 文案变化会导致图标缺失。

## 解决方案
- 兜底匹配从仅 includes("饮水机") 扩展为包含「饮水机/净水机/净水」均使用同一图标(饮水机数量.png)。
- 新增资产类型时按实际 label 文案发扩展兜底逻辑。
- 映射统一维护在 STAT_ICON_MAP，statIconStyle 做兜底扩展。

## 验证与归属
- 验证：operatingAssets.vue 中 STAT_ICON_MAP 增加 净水机->饮水机数量.png，statIconStyle 兜底扩展。
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue。
- 来源会话：001-stat-icon、331457b6-6823-45bd-8ba1-738beb9d587c；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stat_icon_fallback",
  "source_extraction_id": "809e823a8a154bada81b29b8db7b7ffb",
  "version": 2,
  "memory_type": "entities"
}
-->