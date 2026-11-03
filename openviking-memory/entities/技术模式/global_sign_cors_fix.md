# 全局加签引发腾讯地图外链 CORS 预检失败修复
园区物管2.0 全局请求加签逻辑误伤腾讯地图外链，触发 CORS 预检失败，已限制仅同源 /api/v2.0 接口加签。

## 问题根因
- `public/assets/js/sign.js` 全局改写 `XMLHttpRequest`/`fetch`，为腾讯地图统计外链 `pr.map.qq.com` 请求附加 `nonce` 等头
- 触发 OPTIONS 预检被拦截

## 解决方案
- 新增 `shouldApplySign` 逻辑仅对同源且路径以 `/api/v2.0` 开头的接口加签，外链不再加签
- 修正 `fetch` 的 GET 查询串获取逻辑

## 验证与归属
- 验证：src=园区物管2.0/055.md
- 涉及文件：public/assets/js/sign.js、vite.config.js
- 所属项目：园区物管2.0；来源会话：73936be3-9ab2-412b-8043-33c8c47df458

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_sign_cors_fix",
  "source_extraction_id": "846d672223cd445ea22af46f3ef6a218",
  "version": 1,
  "memory_type": "entities"
}
-->