# 蓝色车位背景色统一至#1677FF
园区物管2.0 中 operatingAssets.vue 的 `.is-orange` 背景与 `asset.color` 旧蓝色值未统一至 `#1677FF`。

## 问题根因
- `.is-orange` 背景色与 `asset.color` 旧蓝色值未统一至 `#1677FF`
- 部分缴费或旧蓝值（如 #d0e4ff/#fde3d1/#409eff，原背景 #D0E4FF）未强制映射主蓝色

## 解决方案
- 修改 `.is-orange` 背景为 `#1677FF` 且文字白色
- 于 `assetCellStyle` 兜底将部分缴费或旧蓝值（如 #d0e4ff/#fde3d1/#409eff，原 #D0E4FF）强制映射 `#1677FF`

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话：fd027401-d927-43fc-8570-7d67081113c7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_blue_color_unify",
  "source_extraction_id": "c8d3cef8b2f248fc83df6e71434716c5",
  "version": 2,
  "memory_type": "entities"
}
-->