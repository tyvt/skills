# 首页轮播图相对路径解析错误修复
无锡市区小程序嵌入H5首页轮播图因相对路径随页面路由错误解析导致接口/图片未正常加载的修复约定。

## 现象
- 首页轮播图似乎没有正常调用接口，媒体资源加载失败。
- ./sfb/... 相对路径在 /szh5/pages/webview/home 下被解析为 /szh5/pages/webview/sfb/zhi2/...（错误）。

## 根因
- 相对路径相对于当前页面 URL 解析，而非基于 H5 发布前缀，路由变化时地址错乱。

## 解决方案
- 媒体路径统一改为基于站点根目录的绝对路径：mediaPath = raw.startsWith('/sfb/') ? raw : `/sfb${raw}`；return `${getH5PublicBase()}${mediaPath}`（getH5PublicBase() → /szh5）。
- 前缀来自 VITE_APP_H5_PUBLIC_BASE（生产环境 /szh5/），与 manifest.json 中 h5.router.base 一致，不随页面路由变化。
- 最终请求形如 https://wygl.wxwgzx.com:8989/szh5/sfb/zhi2/2026/...。

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：47414239-c758-44c5-b55e-6c30c3687109
- 验证会话：47414239-c758-44c5-b55e-6c30c3687109（基线 none）。
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/manifest.json、src/hooks/usePortal.js、src/api/system.js、src/pages/webview/home.vue。
- 所属项目：无锡市区小程序嵌入H5。

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "home_carousel_relative_path",
  "source_extraction_id": "ce14f25e28424c1cbcaa4b9b10c2ae95",
  "version": 1,
  "memory_type": "entities"
}
-->