# Summary
2026-11-04 用户(Lead)指令：苏住房防汛C端所有接口前缀由/api-flood、/api-auth统一改为/api；进入系统若无缓存登录态(flood-token-v1)则进登录页，有则进子系统选择页；本地8095接口代理指向http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com/。助手随后将.env改为VITE_API_BASE_URL=/api、VITE_AUTH_BASE_URL=/api，确认App.vue登录分流已正确，并将nginx 8095 /api/代理目标改为dev网关，验证/api/v2.0/code返回200、无token进登录页、有token进子系统选择页。
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: api-flood/v2.0/code怎么还有这种前缀，一律改为/api，进入系统如果没有缓存登录状态，进入登录页面，缓存了进入子系统选择页，本地8095接口代理到http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com/这个地址
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: No stale references in source. All three requirements are complete. Summary:

## 完成情况

### 1. 接口前缀一律改为 `/api`
`.env`（本地配置，已 gitignore）原为：
```
VITE_API_BASE_URL=/api-flood
VITE_AUTH_BASE_URL=/api-auth
```
改为：
```
VITE_API_BASE_URL=/api
VITE_AUTH_BASE_URL=/api
```
全项目已无 `api-flood` / `api-auth` / `test.zhi.com` 残留引用。重新构建后实测 `http://127.0.0.1:8095/api/v2.0/code` → **HTTP 200**，验证码正常返回。

### 2. 进入系统按登录缓存分流
`src/App.vue` 的 `onLaunch`：有 token（`flood-token-v1`）→ `reLaunch` 到子系统选择页；无 token → 停在登录页（`pages.json` 首页即登录页）。实测：
- **无 token** → 登录页
- **有 token** → `#/pages/systems/index` 子系统选择页

（登录页的图形验证码也已从新网关成功加载，端到端连通）

### 3. nginx 8095 代理指向新 dev 地址
`D:\nginx\conf\sites-available\防汛C端`（sites-enabled 为符号链接，已同步生效）`/api/` 代理目标由 test 网关改为：
```
http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com
```
`nginx -t` 通过，已 `reload`。部署于 `http://127.0.0.1:8095`。

已重新 `bun run build` 并部署到 8095，上面两张截图即为当前部署效果。

这些改动中，`.env` 与 nginx 都属于本地环境配置（不入库），源码无改动。是否需要我把这次环境/代理改动也记录到 README 或 `.env.example` 里备份一份？

<!-- MEMORY_FIELDS
{
  "event_name": "接口前缀统一改api指令",
  "goal": "记录用户需求指令",
  "summary": "2026-11-04 用户(Lead)指令：苏住房防汛C端所有接口前缀由/api-flood、/api-auth统一改为/api；进入系统若无缓存登录态(flood-token-v1)则进登录页，有则进子系统选择页；本地8095接口代理指向http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com/。助手随后将.env改为VITE_API_BASE_URL=/api、VITE_AUTH_BASE_URL=/api，确认App.vue登录分流已正确，并将nginx 8095 /api/代理目标改为dev网关，验证/api/v2.0/code返回200、无token进登录页、有token进子系统选择页。",
  "ranges": "0,48-55",
  "source_extraction_id": "9f9a97dcf5b34ac28c1785f2bf22c9b3",
  "version": 1,
  "memory_type": "events"
}
-->