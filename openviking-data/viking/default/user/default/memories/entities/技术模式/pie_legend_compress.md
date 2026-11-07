# 饼图例圆形图标等宽致横向压缩
园区物管2.0 资产沙盘 fundPanorama 饼图图例因圆形图标等宽设置导致底部多列排布色块横向压缩显扁。

## 问题根因
- `buildDistrictPieLegendOption` 中图例 `icon:'circle'` 且 `itemWidth`/`itemHeight` 均为 10
- 底部多列排布时色块被等宽挤压，视觉上显扁

## 解决方案
- 图例 `icon` 改为 `'roundRect'`
- 设 `itemWidth:16`、`itemHeight:9` 减轻压缩

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：2072cf12-f804-48fc-bb6d-3bb1bf4de438；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_legend_compress",
  "source_extraction_id": "f03398b51ded4ce1afcdcc21da6e622c",
  "version": 1,
  "memory_type": "entities"
}
-->