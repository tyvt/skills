# 腾讯地图 SPA 请求发起方
园区物管2.0 大屏/统计地图页用 ZsTencentMap 加载腾讯地图，所有网络请求均由用户浏览器发起。

## 关键事实
- 动态插入 script 加载 map.qq.com gljs SDK，行政区划边界走腾讯 WebService JSONP（apis.map.qq.com/ws/district/v1/search）
- 底图瓦片由 SDK 在浏览器内继续拉取，业务数据接口走 $get → VITE_APP_BASE_API
- 纯 Vue SPA，页面加载后所有请求（业务接口+地图SDK+JSONP+瓦片）全部由用户浏览器发起，前端 Nginx 静态机不代发任何请求

## 部署要点
- 前端静态服务器禁外网不影响地图
- 真正前置条件：用户浏览器能访问 map.qq.com、apis.map.qq.com 及后端网关
- 客户环境纯内网或防火墙拦腾讯域名时地图必然失败，需提前确认网络策略或换内网瓦片方案

## 关联
- 涉及文件：zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js、src/views/benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0
- 来源会话：265a0398-04ab-4311-b536-f18b5d57b75e

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "架构技术事实",
  "name": "tencent_map_spa",
  "source_extraction_id": "c2bae86dadf94c5dbe29e2855b2b27c1",
  "version": 1,
  "memory_type": "entities"
}
-->
