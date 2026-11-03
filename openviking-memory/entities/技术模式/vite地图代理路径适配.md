# Vite地图代理路径适配
园区物管2.0 地图区划（腾讯行政区划）数据在 Vite 相对路径部署下的适配与最终方案。

## 问题背景
- 早期 base='./' 部署时代理写死绝对路径 /map/... 致子路径 404，用 getDistrictProxyPrefix 返回 './map' 暂解。
- 生产报 `Unexpected token '<'... is not valid JSON`：tencentDistrictBoundary.js 用 `import.meta.env.DEV` 分流，dev 走 fetch('./map/...') 依赖 Vite 代理，生产无代理落 index.html 被 res.json() 报错。
- terser 压缩后 DEV 分支被保留、JSONP 分支当死代码删，生产包实际跑开发分支。
- 错误写法 `if (void 0 !== import.meta && l && !0)` 运行时探测 import.meta 是否存在，压缩后恒真走 ./map 代理而非 JSONP（apis.map.qq.com）；旧构建 index-DUzdsYzz.js 验证此问题，新构建改用 import.meta.env.DEV 正确走 JSONP。

## 解决方案
- 区划 GeoJSON 等依赖 dev 代理的第三方数据拉取，统一改 JSONP 直连腾讯行政区划 API（apis.map.qq.com），与 statisticsMap/map.vue 同套路，摆脱本地代理。
- 环境判断必须直接用 `import.meta.env.DEV`，让压缩器固化布尔常量、剔除 dead code，而非运行时探测 import.meta；此写法通用于所有「仅开发环境代理/路径」判断。
- 修复后重新构建核对产物含 JSONP 调用、不含 fetch('./map')，整包替换 dist 并清 CDN/浏览器缓存。
- 前置：后台 platformConfig.region 配 6 位 adcode、腾讯地图 Key 开通 WebServiceAPI（JSONP 必需）。

## 排查要点
- 生产报 HTML 解析错误先查请求是否落 index.html，用控制台确认腾讯接口具体错误（Key 权限/配额）。
- 生产 404 另一根因是哈希 chunk 部署/缓存不一致：Network 看失败文件哈希是否还在新引用里，处理为整包 dist 覆盖+清缓存，勿只拷部分文件。
- 涉及文件：tencentDistrictBoundary.js、mapOverview/index.vue、statisticsMap/components/map.vue；所属项目：园区物管2.0（zhi2-web-admin）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "Vite地图代理路径适配",
  "source_extraction_id": "88d68922b8ca46d2b8056d0afb581a2e",
  "version": 4,
  "memory_type": "entities"
}
-->