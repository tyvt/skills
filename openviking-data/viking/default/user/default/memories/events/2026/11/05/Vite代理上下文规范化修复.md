# Summary
用户在产品2.0项目的 zhi2-web-admin 中修复了 Vite 接口代理失效问题。原因：VITE_APP_BASE_API 配置为 api/v2.0（无前导斜杠），而浏览器请求路径以 /api/v2.0/ 开头；Vite 用 req.url.startsWith(代理key) 匹配，导致代理规则永远匹配不上，请求落到前端静态资源。修改：在 vite.config.js 增加 normalizeProxyContext，将 api/v2.0 规范化为 /api/v2.0 再作为代理 key，与 req.url 一致。涉及文件 vite.config.js、env/.env、src/api/index.js、src/utils/request.js、env、package.js 等。完成于 2026-11-05。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】preference
【标题】接口代理失效了
【内容】## 原因说明 Vite 里代理是否命中用的是 **`req.url.startsWith(代理的 key)`**（源码里 `doesProxyContextMatchUrl`）。 当前环境里是 `VITE_APP_BASE_API = api/v2.0`（**没有前导 `/`**），所以代理表里的 key 是 `api/v2.0`。 而浏览器实际请求路径是 **`/api/v2.0/...`**（一定以 `/` 开头）。 于是出现： - `'/api/v2.0/xxx'.startsWith('api/v2.0')` → **false** 代理规则永远匹配不上，请求会落到前端静态资源上，看起来就像「代理失效」。 ## 已做修改 在 `vite.config.js` 里增加了 `normalizeProxyContext`，把 `api/v2.0` 规范成 **`/api/v2.0`** 再作为代理 key，与 `req.url` 一致。 ```43:50:d:\repository\产品2.0\zhi2-web-admin\vite.config.js // Vite 用 req.url.startsWith(context) 匹配代理；req.url 始终以 "/" 开头，故 context 也必须带 "/" function normalizeProxyContext(ba
【验证证据】extracted source=cursor project=产品2.0
【涉及文件】`vite.config.js ; ```43:50:d:\repository\产品2.0\zhi2-web-admin\vite.config.js ; 涉及文件：d:\repository\产品2.0\zhi2-web-admin\vite.config.js、d:\repository\产品2.0\env\.env、d:\repository\产品2.0\zhi2-web-admin\src\api\index.js、d:\repository\产品2.0\zhi2-web-admin\src\utils\request.js、d:\repository\产品2.0\env、d:\repository\产品2.0\zhi2-web-admin\package.js
【所属项目】产品2.0
【来源会话ID】317d62ff-fec1-4cf3-a02d-1ac604d82396
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "Vite代理上下文规范化修复",
  "goal": "记录代理配置修复",
  "summary": "用户在产品2.0项目的 zhi2-web-admin 中修复了 Vite 接口代理失效问题。原因：VITE_APP_BASE_API 配置为 api/v2.0（无前导斜杠），而浏览器请求路径以 /api/v2.0/ 开头；Vite 用 req.url.startsWith(代理key) 匹配，导致代理规则永远匹配不上，请求落到前端静态资源。修改：在 vite.config.js 增加 normalizeProxyContext，将 api/v2.0 规范化为 /api/v2.0 再作为代理 key，与 req.url 一致。涉及文件 vite.config.js、env/.env、src/api/index.js、src/utils/request.js、env、package.js 等。完成于 2026-11-05。",
  "ranges": "4-12",
  "source_extraction_id": "c0b8e6e9aa8c40fba7524c2279972657",
  "version": 1,
  "memory_type": "events"
}
-->