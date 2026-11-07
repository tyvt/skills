# 楼幢详情清除地块未同步清理ID修复
宜兴公共收益项目在 `building/detail.vue` 与 `buildingChange/detail.vue` 中新增 `clearLandPlot` 方法，修复删除地块名称后仍提交 `landPlotId`/`landPlotCode` 的问题。

## 问题背景
- 地块名称输入框支持清除（`zs-input` 默认 `clearable`），但清除时只清空界面 `landPlotName`，`landPlotId`、`landPlotCode` 仍留在表单
- `beforeSaveHook` 只处理开发项目为空的情况，未处理地块名称为空，导致保存时仍带上宗地参数、地块信息再次显示

## 解决方案
- 在 `building/detail.vue` 与 `buildingChange/detail.vue` 新增 `clearLandPlot` 方法，清空 `landPlotId`、`landPlotCode`、`landPlotName`
- 地块名称输入框增加 `@clear="clearLandPlot"`
- `beforeSaveHook` 中若 `landPlotName` 为空，保存前调用 `clearLandPlot(false)`
- 楼幢变更页同时为开发项目增加 `@clear` 处理

## 涉及文件
- zhi2-web-admin/src/views/building/building/detail.vue
- zhi2-web-admin/src/views/building/buildingChange/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor
- 所属项目：宜兴公共收益；代码基线：none；来源会话：f539a440-e636-4108-a075-abb1b30aa481

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_clearlandplot_fix",
  "source_extraction_id": "033c4384d3a244c9b904b7072ccc1be0",
  "version": 1,
  "memory_type": "entities"
}
-->