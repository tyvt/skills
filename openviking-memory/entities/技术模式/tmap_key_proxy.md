# 保障房G 腾讯地图 Key 加载与安全代理
在保障房G（zhi2-web-admin）中，腾讯地图 Key 统一从系统参数读取，并通过安全代理转发，避免硬编码与前端点位暴露。

## 问题背景
- 硬编码地图 Key 不利于统一配置与维护，直连的 GL JS Key 会暴露在前端页面与请求中。

## 解决方案
- 已按腾讯官方 GL 安全代理文档（https://lbs.qq.com/webApi/javascriptGL/glGuide/glKeyDelegate）完成前端改造。
- 新增 src/utils/mapKey.js，通过 /system/config/getByKey/sys.config.map.key 获取 Key，提供带缓存的 getMapKey() 与 loadTencentMapScript()，不再从后端拉取 sys.config.map。
- 移除 index.html 中的腾讯地图 script 标签；mapLoader.js 改为调用 loadTencentMapScript() 加载 SDK；ZsTencentMap/index.vue 组件创建时加载地图脚本。
- 登录后预加载：router/index.js 中用户登录并获取信息后自动预加载地图脚本。
- 加载 gljs 之前设置 window._TMapSecurityConfig.serviceHost（默认 /_TMapService），脚本 URL 去掉 &key=xxx。
- 新增 getTMapWsUrl() 代理 WebService 请求；commuteDialog.vue 与 markMap.vue 移除 mapKey/getMapKey()，axios 请求改为 getTMapWsUrl('geocoder/v1') 等，不再传 key。
- vite.config.js 本地开发代理用 /_TMapService、/_TMapService_ws 替代原有的 /map；本地需在 env/.env 配置 VITE_APP_TMAP（勿提交仓库）。

## 验证与归属
- 证据：extracted source=cursor project=保障房G；来源会话 1a4ee6c3-daea-476a-ba1b-6b0b105cdce0、cafeb002-fbae-47a3-861d-f9f0d1ad95f1。
- 涉及文件：src/utils/mapKey.js、vite.config.js、ZsTencentMap/mapLoader.js、ZsTencentMap/index.vue、commuteDialog.vue、markMap.vue、index.html、Map/index.vue、src/main.js、LoginForm.vue、src/router/index.js 等。
- 所属项目：保障房G（zhi2-web-admin）；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_key_proxy",
  "source_extraction_id": "911474cd4feb42868c2d557caafc7cad",
  "version": 2,
  "memory_type": "entities"
}
-->