- 偏好无锡地图（Wuxi map SVG）整体往右偏移：通过 ECharts `geo.layoutCenter` 水平中心设为 `54%`、地图容器 `.chart-box--map` 的 `margin-left` 设为 `40px`（涉及 `benefit/mapOverview/index.vue`）。
- 微调地图水平位置时，可指定只动 `layoutCenter`（不动左侧空白）或只动 `margin-left`，二选一即可。
- 适用项目：园区物管2.0。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "无锡地图SVG位置偏好",
  "source_extraction_id": "bf139bd80b7140d48c164f6f123cfa36",
  "version": 1,
  "memory_type": "preferences"
}
-->