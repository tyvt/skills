# 地图移入高亮源于emphasis需对齐常态样式

`initMap` 中 `geo.emphasis` 复用高亮样式导致移入高亮；将 `geo.itemStyle` 与 `geo.emphasis` 均设为 `WUXI_GEO_BASE_ITEM_STYLE` 及 `wuxiMapLabelRich(false)`，使移入视觉与常态一致，轮播高亮逻辑保持不变。

**验证证据**：extracted source=cursor session=dc3adc83-b4a0-4e74-9b28-aebb578f54f0

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/index.vue、d:/repository/园区物管2.0/zhi2-web-admin/package.json

**所属项目**：园区物管2.0
**来源会话**：dc3adc83-b4a0-4e74-9b28-aebb578f54f0
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "map_hover_style_align",
  "source_extraction_id": "f5d831b184074ef7877fa2026e807b62",
  "version": 1,
  "memory_type": "entities"
}
-->