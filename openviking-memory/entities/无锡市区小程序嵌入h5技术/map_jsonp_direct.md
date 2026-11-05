# H5地图接口JSONP直连方案
H5端地图能力通过JSONP直连腾讯地图API，移除了原有的/map反向代理配置。

## 改动说明
- H5：src/utils/index.js 中通过 JSONP 直连 https://apis.map.qq.com，不再走 /map 代理
- 微信小程序：仍用 wx.request 直连，逻辑不变
- localSearch 统一调用上述封装，周边配套页无需再改
- vite.config.ts 已删除 /map 反向代理（H5 不再需要）

## 上线前确认
- 腾讯位置服务控制台需勾选 WebServiceAPI
- 域名白名单填入 H5 实际域名（如 xxx.com）
- 本地调试可临时留空白名单或加 localhost
- 不要只开「授权 IP」（浏览器 JSONP 不适用）
- 返回 status: 110 说明域名未授权，需补白名单

## 验证与归属
- 验证方式：重启 dev 后打开小区详情页，切换周边分类，Network 应看到对 apis.map.qq.com 的 JSONP 请求
- 涉及文件：src/utils/index.js、vite.config.ts、pages_owner/project/info/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：3fda969f-b9ae-4890-9964-06abe55f6a13

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "map_jsonp_direct",
  "source_extraction_id": "02646a38798d4274816c0f4acd8a2a27",
  "version": 1,
  "memory_type": "entities"
}
-->