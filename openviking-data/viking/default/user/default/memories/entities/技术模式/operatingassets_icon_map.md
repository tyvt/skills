# operatingAssets 统计图标映射
在 operatingAssets.vue 中更新 STAT_ICON_MAP 与 statIconStyle()，使“饮水/净水机”等卡片图标正确匹配。
## 变更内容
- STAT_ICON_MAP 增加 `净水机` -> `饮水机数量.png`
- statIconStyle() 兜底匹配从仅 `label.includes("饮水机")`，扩展为包含 `饮水机` 或 `净水机` 或 `净水` 均使用 `饮水机数量.png`
## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 刷新页面后“饮水/净水机”统计卡片图标应对上；若仍不匹配需提供卡片 label 文案继续补
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 所属项目：repository；来源会话：331457b6-6823-45bd-8ba1-738beb9d587c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operatingassets_icon_map",
  "source_extraction_id": "21fd6d90a3ef4a549ff47a78e0a03a47",
  "version": 1,
  "memory_type": "entities"
}
-->