# 苏服办门户首页轮播仅用本地图
应用 Tab「首页」对应 pages/webview/home，轮播为页面内原生 swiper，当前仅加载本地图不调后端接口。

## 页面与组件
- 应用入口与 Tab「首页」对应 `pages/webview/home`（pages.json 首项、custom-tabbar 指向该路径）
- 轮播为页面内原生 `<swiper>`，未引用全项目零引用的 `components/ZsSwiper/ZsSwiper.vue`
- `pages/index/home.vue`、`newHome.vue` 不是线上 Tab 首页轮播承载页

## 数据流
- `banners` 默认 `resolveZhishuAsset('background@2x.jpg')`
- `onLoad` 调 `usePortal` 的 `loadBanners(banners)`，其实现为 `banners.value = getPortalLocalBanners()`
- 当前不请求后端 banner 接口；若要接动态轮播应在 webview/home 或 usePortal.loadBanners 接 API

## 验证与归属
- 验证证据：会话 57231176 调查报告明确 webview/home 为实际首页轮播、ZsSwiper 无引用、loadBanners→getPortalLocalBanners、当前不调 API
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/webview/home.vue、src/hooks/usePortal.js、src/components/ZsSwiper/ZsSwiper.vue、src/pages.json
- 所属项目：无锡市区小程序嵌入H5；来源会话：57231176-a6b7-4b43-9f0e-efd6c6a682f6；代码基线：6c9a164

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "webview_home_banner",
  "source_extraction_id": "55ebfb54fdd04af4b4e59c85f823897e",
  "version": 1,
  "memory_type": "entities"
}
-->