
# main.js Token 重复挂载修复
产品2.0 的 zhi2-web-admin 修复 URL 带 token 且非 iframe 时 `createInstance` 重复调用导致双根实例的问题。

## 问题原因
- `query` 有 `token` 时先 `setToken` 再 `createInstance()`（约208-211行）
- 当 `VITE_APP_IS_IFRAME != "1"` 时，后面 `else` 无条件再调一次 `createInstance()`（约232-233行）
- iframe 场景父页面 `postMessage` 带 token 也会再调，存在重复挂载风险

## 修复内容
- 只解析一次 `URLSearchParams`，用 `tokenFromUrl` 判断并 `setToken`
- 非 iframe 时改为 `else if (!tokenFromUrl)` 再 `createInstance()`，避免重复
- 在 `createInstance` 开头增加 `if (instance) return` 防护

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/main.js`
- 所属项目：产品2.0；来源会话：6da734ba-569d-4721-a801-3c8dd95f3fee；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "main_js_token_double_mount_fix",
  "source_extraction_id": "da9bca3f195c4fd8a5e10c92635c7b91",
  "version": 1,
  "memory_type": "entities"
}
-->