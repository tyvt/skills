# GIS 地图按钮 append 最小宽度修复
苏州市房地产监测V3 项目中修复了 `map-append` 在三列栅格较窄时图标与「GIS地图」文字挤在一起的问题。

## 问题原因
- `map-append` 在窄栅格里 append 区域无最小宽度，插槽内图标与文字易重叠挤压

## 修复内容
- `zhi2-web-admin/src/styles/index.scss` 中 `map-append` 的 append 设置 `min-width: 96px`
- 内层 `div` 使用 `inline-flex` 排版，避免图标与文字挤压

## 涉及文件
- `zhi2-web-admin/src/styles/index.scss`
- `zhi2-web-admin/src/components/zs-form/zs-form.vue`（同批标签布局修复）

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：cadb780a-cd20-4d3f-bafd-1a73a68f6a69；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gis_append_fix",
  "source_extraction_id": "aff9df126aa24c699d3457e4ec4b1263",
  "version": 1,
  "memory_type": "entities"
}
-->