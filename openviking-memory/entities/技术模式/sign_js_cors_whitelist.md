# sign.js 全局加签致外链 CORS 失败
园区物管2.0 中 sign.js 全局改写 XHR/fetch 加签会把自定义头带到第三方外链，触发 CORS 预检失败，需加同源白名单。

## 现象
- 引入腾讯地图等第三方 SDK 后控制台报 CORS，外链请求（如 pr.map.qq.com 统计 pingd）预检被拒，提示 nonce 头不在 Access-Control-Allow-Headers。

## 根因
- public/assets/js/sign.js 全局改写 XMLHttpRequest 和 fetch，只要 sessionStorage 有 Admin-Token 就对每次请求（含第三方外链）附加 nonce/timestamp/sign 自定义头。
- 第三方域名不允许这些头，OPTIONS 预检必然失败；报错表面像腾讯地图配置问题，真凶在本项目加签脚本。

## 解决方案
- sign.js 增加 shouldApplySign 白名单：仅对当前站点同源、且路径以约定 API 前缀（SIGN_API_BASE，须与 env 的 VITE_APP_BASE_API 一致，含 /dev-api 等代理前缀变体）开头的请求加签，外链一律不加。
- 排查第三方 SDK 请求被篡改时先查全局 XHR/fetch wrapper。
- 顺带修正 fetch 首参为 URL/Request 时取查询串的逻辑。

## 验证与归属
- 验证：会话 73936be3 CORS 报错定位到 sign.js 全局加签，补 shouldApplySign（同源 + /api/v2.0 前缀）后外链不再加签。
- 涉及文件：public/assets/js/sign.js、vite.config.js、env/.env。
- 所属项目：园区物管2.0；来源会话：73936be3-9ab2-412b-8043-33c8c47df458；代码基线：f00310232。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sign_js_cors_whitelist",
  "source_extraction_id": "c83f42b2da4141d9b9f2031f7272f576",
  "version": 1,
  "memory_type": "entities"
}
-->