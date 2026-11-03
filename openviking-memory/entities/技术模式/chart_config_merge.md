# 图表结构配置驱动与加载合并
园区物管2.0 资产全景页将重复的环形/条形图结构合并为配置驱动，并统一数据加载与图表更新。

## 问题描述
- `assetPanorama/index.vue` 原先环形图与条形图结构重复书写，维护成本高

## 解决方案
- 将重复结构合并为 `v-for="block in CHART_BLOCKS"` 配置驱动渲染
- 纯函数上提至模块级，避免组件内重复定义
- 四个 `loadXxxData` 合并为 `PANORAMA_API_LOADERS` + `Promise.all` 并行加载
- 图表更新统一 `upsertChart`，按 `cardIndex*2` 与 `cardIndex*2+1` 槽位写入

## 验证与归属
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue、src/views/benefit/dataSandbox/assetPanorama/mock.js、src/views/benefit/dataSandbox/pieLegendHover.js
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：c9fce210-f5e5-4591-b857-e112b3ac6150

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "chart_config_merge",
  "source_extraction_id": "e008fb7437824de69119ff4118b6d71b",
  "version": 1,
  "memory_type": "entities"
}
-->