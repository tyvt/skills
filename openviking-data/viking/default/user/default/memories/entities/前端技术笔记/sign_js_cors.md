# 全局签名脚本误加签致地图CORS报错
园区物管2.0 中 public/assets/js/sign.js 全局改写请求并给外部链接误加签，导致腾讯地图统计请求触发 CORS 预检失败。

## 问题根因
- sign.js 在 sessionStorage 有 Admin-Token 时给每次 XHR/fetch 加 nonce、timestamp、sign
- 腾讯地图脚本访问 pr.map.qq.com/pingd 做统计，浏览器 OPTIONS 预检，对方未允许自定义头 nonce 被拦截
- 原 fetch 在 GET 场景取查询串用 url.includes 不可靠

## 解决方案
- 增加 shouldApplySign：仅对同源且路径以 /api/v2.0（与 SIGN_API_BASE、VITE_APP_BASE_API 默认一致）开头的接口加签
- 外链（如 pr.map.qq.com）不再加签，不再触发 CORS
- 修正 fetch 在 GET 场景第一个参数为 URL/Request 时取查询串的逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：public/assets/js/sign.js、vite.config.js
- 所属项目：园区物管2.0；来源会话：73936be3-9ab2-412b-8043-33c8c47df458；代码基线：none
- 修复后需硬刷新或清缓存再试地图页

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "sign_js_cors",
  "source_extraction_id": "b701ffae5f6b4b488b7ce890c4ed9a0e",
  "version": 1,
  "memory_type": "entities"
}
-->