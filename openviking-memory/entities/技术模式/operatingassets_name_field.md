# operatingAssets 资产名称取值
operatingAssets.vue 按资产类型分别优先使用各自名称字段，并以 assetLeaseName 兜底防空白。

## 名称字段映射
- 经营用房：houseName（fallback：assetLeaseName）
- 停车位：spaceNumber（fallback：assetLeaseName）
- 广告位：advertiseSpaceName（fallback：assetLeaseName）
- 公共场地：venueName（fallback：assetLeaseName）

## 验证与归属
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话：629035c8-256f-4490-890e-e576020db92e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operatingassets_name_field",
  "source_extraction_id": "fcd8a128f48a41fc9c6111b9caff053b",
  "version": 1,
  "memory_type": "entities"
}
-->