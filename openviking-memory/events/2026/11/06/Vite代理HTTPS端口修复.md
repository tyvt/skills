# Summary
2026-11-06，淮安物管项目 zhi2-web-admin 中修复 Vite 代理报错 "The plain HTTP request was sent to HTTPS port"。原因是 env/.env 中 VITE_APP_PROXY_ADDRESS 原为 http://222.184.31.232:15777，明文 HTTP 连接了仅提供 HTTPS 的端口（常见于 Nginx 在 443/业务端口做 SSL）。修复方式为将 env/.env 改为 https://222.184.31.232:15777，并在 vite.config.js 中对 target 做 trim() 且当 target 以 https: 开头时增加 secure: false。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】preference
【标题】The plain HTTP request was
【内容】## 原因说明 报错 **“The plain HTTP request was sent to HTTPS port”** 表示：Vite 代理用 **明文 HTTP** 去连了一个只提供 **HTTPS/TLS** 的端口（常见是前面有 Nginx 在 443/业务端口上做 SSL）。 你当前 `env/.env` 里是： ```4:4:d:\repository\淮安物管\env\.env VITE_APP_PROXY_ADDRESS = https://222.184.31.232:15777 ``` （已把原来的 `http://` 改成了 `https://`。） `createProxyConfig` 里 `target` 会原样交给 `http-proxy`，写成 `http://` 时就会发明文，和 HTTPS 端口不匹配。 ## 已做修改 1. **`env/.env`**：`http://222.184.31.232:15777` → `https://222.184.31.232:15777`。 2. **`zhi2-web-admin/vite.config.js`**： - 对 `target` 做 `trim()`，避免 `KEY = 值` 前后空格把 URL 弄坏。 - 当 `target` 以 `https:` 开头时增加 **`secure: f
【验证证据】extracted source=cursor project=淮安物管
【涉及文件】**`zhi2-web-admin/vite.config.js ; 涉及文件：d:\repository\淮安物管\zhi2-web-admin\vite.config.js ; port@zhi2-web-admin/vite.config.js
【所属项目】淮安物管
【来源会话ID】c0419709-71ee-413d-b8bd-e7489ed2c10c
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "Vite代理HTTPS端口修复",
  "goal": "修复代理端口报错",
  "summary": "2026-11-06，淮安物管项目 zhi2-web-admin 中修复 Vite 代理报错 \"The plain HTTP request was sent to HTTPS port\"。原因是 env/.env 中 VITE_APP_PROXY_ADDRESS 原为 http://222.184.31.232:15777，明文 HTTP 连接了仅提供 HTTPS 的端口（常见于 Nginx 在 443/业务端口做 SSL）。修复方式为将 env/.env 改为 https://222.184.31.232:15777，并在 vite.config.js 中对 target 做 trim() 且当 target 以 https: 开头时增加 secure: false。",
  "ranges": "6-12",
  "source_extraction_id": "0059dbabdf634007a65211343e4af655",
  "version": 1,
  "memory_type": "events"
}
-->