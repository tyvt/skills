- 趋势混合图的 `grid.right` 从 `66` 调到 `46`，绘图区整体往右多占一截，减轻右侧空白
- `containLabel: true` 仍保证右侧刻度有最小空间，右侧「单位：万元」由 `finished` 里的 `syncTrendMixedUnitGraphics` 按实际 grid 矩形对齐，一般不用改那段逻辑
- 若出现刻度或「万元」贴边，把 `46` 略调到 `50`～`54` 即可
- 涉及文件：benefit/dataSandbox/fundPanorama、benefit/dataSandbox/fundPanorama/index.vue、package.js
- 所属项目：园区物管2.0；来源会话：3fb2025f-5558-4b3c-b155-b057ddc32224

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "趋势混合图grid.right调整",
  "source_extraction_id": "b53f67a2d96e43569185fbf904cc755a",
  "version": 1,
  "memory_type": "preferences"
}
-->