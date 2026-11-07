# 清除地块名未清ID致楼幢保存仍传宗地参
`zs-input` 清除 `landPlotName` 未触发 `@clear` 导致 `landPlotId`/`landPlotCode` 残留，`beforeSaveHook` 未判空。

## 问题背景
- `building/detail.vue` 与 `buildingChange/detail.vue` 中 `zs-input` 绑定 `landPlotName`
- 清除 `landPlotName` 未触发 `@clear`，致 `landPlotId`/`landPlotCode` 残留
- `beforeSaveHook` 未对 `landPlotName` 判空，保存时仍向后端传宗地参数

## 修复方案
- 在 `building/detail.vue` 与 `buildingChange/detail.vue` 新增 `clearLandPlot` 方法并绑定 `@clear`
- `beforeSaveHook` 中 `landPlotName` 为空时调用 `clearLandPlot(false)` 清空关联字段
- 关联 `house/detail.vue`、`mixins/form.js`、`utils/projectOrLandPlotMixin.js` 协同修改

## 验证与归属
- 验证证据：extracted source=cursor session=f539a440-e636-4108-a075-abb1b30aa481
- 涉及文件：zhi2-web-admin/src/views/building/building/detail.vue、zhi2-web-admin/src/views/building/buildingChange/detail.vue、zhi2-web-admin/src/views/building/house/detail.vue、zhi2-web-admin/src/mixins/form.js、zhi2-web-admin/src/views/building/utils/projectOrLandPlotMixin.js
- 所属项目：宜兴公共收益；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "clear_landplot_id",
  "source_extraction_id": "6673f6762b3d4751a1d6ccd4481466cb",
  "version": 1,
  "memory_type": "entities"
}
-->