# 饼图图例图标宽度调整
园区物管2.0 数据沙盘 fundPanorama 饼图图例图标过窄显压缩，已改为圆角条并加宽。

## 问题背景
- 饼图图例原用 `icon: 'circle'`，`itemWidth`/`itemHeight` 均为 10，底部多列排布时色块偏挤、显得扁糊

## 解决方案
- 在 `buildDistrictPieLegendOption` 中（底部多行图例与右侧纵向图例两处一致）将 `icon` 改为 `roundRect`
- `itemWidth: 16`、`itemHeight: 9`，色块更宽略扁，减轻横向压缩感
- 若需保留正圆仅变大，可改回 `circle` 并调宽高至如 12×12

## 验证与归属
- 验证：会话 2072cf12 用户反馈饼图图标偏压缩，改 roundRect+16×9 后改善
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：2072cf12-f804-48fc-bb6d-3bb1bf4de438；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_legend_icon",
  "source_extraction_id": "36c9965ef43747f1beeac292278e36f5",
  "version": 1,
  "memory_type": "entities"
}
-->