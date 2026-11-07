# CSS静态资源URL注入
园区物管2.0 的 Vite 项目中，<style> 里 url() 无法执行 JS 解析子路径部署地址，通过 JS 注入 CSS 变量配合 resolveServerAssetUrl 解决。

## 问题背景
- Vite 项目里 <img> :src 和 ECharts rich 图标可用 import + resolveServerAssetUrl 解析（兼容子路径部署），但 <style> 里的 url("@/assets/...") 无法执行 JS、拿不到解析后地址，子路径部署时背景图/装饰图会 404。
- CSS 是静态产物，编译期 url() 与运行时代理/子路径前缀解析是两条链路。

## 解决方案
- 图片统一用 import assetXxx from '@/assets/...'（Vite 下比 require 稳），集中构造 MAP_OVERVIEW_ASSET_URL 映射对象，每个字段都过 resolveServerAssetUrl；data 里暴露一份给模板与 initMap 共用。
- 样式需图处，在 mounted 最前面同步执行 injectXxxCssAssetVars()，在页面根元素上 setProperty('--mov-xxx', `url(${JSON.stringify(已解析地址)})`)，样式改写为 var(--mov-xxx)；注入放 mounted 同步执行、再 $nextTick 初始化图表，减轻首帧闪烁。
- 函数入参判 el instanceof HTMLElement 以过类型检查。

## 涉及文件
- zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- zhi2-web-admin/src/utils/resolveServerAssetUrl.js
- 所属项目：园区物管2.0（代码基线 f00310232，来源会话 659b9b99-3806-4640-804a-486f070d2eef）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "CSS静态资源URL注入",
  "source_extraction_id": "55c1f8ecd97649acabbcbd94a8dbf7c0",
  "version": 1,
  "memory_type": "entities"
}
-->
