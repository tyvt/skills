# 图片资源统一按 resolveServerAssetUrl 引入
园区物管2.0 效益分析-地图总览页（benefit/mapOverview）所有图片资源统一按 `resolveServerAssetUrl` 处理。

## 改造要点
- 从 `@/utils/resolveServerAssetUrl` 引入工具函数
- 所有用到的 png/svg 用 `import assetXxx from '@/assets/...'`（符合 Vite，比 `require` 更稳）
- 集中构造 `MAP_OVERVIEW_ASSET_URL`，每个字段都是 `resolveServerAssetUrl(资源模块)`
- `data` 里暴露 `mapAssetUrls`，模板和 `initMap` 里用同一份地址

## 使用位置
- 吉祥物 `<img>`：`:src="mapAssetUrls.mascot"`
- ECharts 标签小图标 `rich.mapIcon`：`MAP_OVERVIEW_ASSET_URL.mapLocation`
- `fetch` 加载无锡 SVG：`fetch(this.mapAssetUrls.wuxiSvg)`

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话ID：659b9b99-3806-4640-804a-486f070d2eef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "图片资源resolveServerAssetUrl引入",
  "source_extraction_id": "b6f1ddc484254c13960ed58672e6cb01",
  "version": 1,
  "memory_type": "entities"
}
-->