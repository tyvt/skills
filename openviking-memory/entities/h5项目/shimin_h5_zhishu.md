# 市民H5指数C项目
作为 web-view 嵌入微信小程序的 H5 项目（gitlab 路径含 homeland-fe-zhi2/mobile/shimin/h5/zhishu-c）。

## Description
- 本项目以 web-view 形式嵌入微信小程序，使用 hash 路由，入口 URL 始终是同一个 index.html。
- 生产入口地址：`https://sipps.sipac.gov.cn/wechatapph5/#/`（2026-11-13 确认），nginx 加缓存头、小程序侧拼时间戳 `?t=` 穿透缓存。
- 构建工具为 Vite，默认开启 filename hashing，dist 产物文件名带 hash。
- vite.config.ts 的 html-transform 插件向 `<html>` 写入 build-time 构建时间，每次构建 HTML 内容都会变。

## 技术细节
- index.html 直接引用 `./static/js/tracker.js`，该文件走 static 原样拷贝、无 hash，会被 WebView 永久缓存。
- App.vue 包含 `stripTokenFromUrl()`，专门把 token 从地址栏剥掉。
- 与小程序的代码分属不同仓库，本仓库可改动点含 tracker.js 版本化（可选）。

## 关键事实
- 2026-11-09 修复过会话固定漏洞，`stripTokenFromUrl()` 即为该修复的一部分。
- 部署侧缓存头（nginx）不在本项目仓库内，2026-11-13 已在外层 nginx 的 `/wechatapph5/` location 加 `Cache-Control: no-cache`（HTML）与 assets 强缓存，缓存问题闭环。

<!-- MEMORY_FIELDS
{
  "category": "H5项目",
  "name": "shimin_h5_zhishu",
  "source_extraction_id": "ab6df718179645ddb2d1380ab79511b9",
  "version": 2,
  "memory_type": "entities"
}
-->