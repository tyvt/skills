# GIS 地图按钮 map-append 最小宽度修复
苏州市房地产监测V3 项目修复了 `zs-form` 内 GIS 地图按钮在窄列下图标与文字挤压的问题。

## 问题原因
- `map-append` 在三列栅格里较窄时，append 区域没有最小宽度
- 插槽里的图标和「GIS地图」文字容易挤在一起

## 修复内容
- 文件：`zhi2-web-admin/src/styles/index.scss`
- `map-append` 的 append 设置 `min-width: 96px`
- 内层 `div` 使用 `inline-flex` 布局，保证图标与文字不挤压

## 涉及文件
- `zhi2-web-admin/src/components/zs-form/zs-form.vue`
- `zhi2-web-admin/src/styles/index.scss`
- `zhi2-web-admin/src/views/projectManagement/buildinginfo/detail.vue`
- `zhi2-web-admin/src/components/detail-template/detail-template.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：cadb780a-cd20-4d3f-bafd-1a73a68f6a69；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gis_map_append_width_fix",
  "source_extraction_id": "014112f6aff74aea9baf732337ff8e1f",
  "version": 1,
  "memory_type": "entities"
}
-->