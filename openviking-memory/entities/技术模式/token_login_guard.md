
# 外链Token自动登录的路由守卫修复
zhi2-web-admin 中携带 token 的外链打开后停留在登录页的问题，经两轮修复于 2026-11-12 解决。

## 问题根因（两层）
- 主因（当前现象真因）：外链形如 `http://host/#/login?token=...`，token 位于 **hash 内**；代码（`src/main.js`、`src/router/index.js`）只用 `new URLSearchParams(window.location.search).get('token')` 取 token，对 hash 路由 `location.search` 为空，token 从未被写入 → 登录页原样停留。
- 次因（第一轮已修）：路由守卫 `handleAuthenticatedRoutes` 命中 `to.path === '/login'` 时只 `next({path:'/index'})` 并 `return`，未执行 GetInfo + GenerateRoutes + addRoute，`/index` 因动态路由未注册、roles 为空被判无权限回退 `/login`。
- 用 Playwright 无头浏览器实测确认：`location.search=""`、`location.hash="#/login?token=..."`、`sessionStorage` 为空、`Admin-Token` 不存在、无 `getInfo` 请求；token 有效（后端 `/api/v2.0/system/user/getInfo` 实测 200 带完整 permissions），非链接过期。

## 修复方案
- 第一轮（commit `f06ff0e2a`，单文件 `src/router/index.js`）：新增 `initUserAndRoutes()` 抽离 GetInfo/基础数据/GenerateRoutes/addRoute 为共用初始化，返回成功或失败，`next()` 交调用方；新增 `logoutAndRedirect(next)` 先 `await FedLogOut()` 清 token 再 `next('/login')` 不带 redirect 避免死循环；`/login` 分支改为 roles 空时先 `await initUserAndRoutes()` 再跳 `/index`，失败登出回登录页，已有 roles 直接跳首页。
- 第二轮（commit `54829a6bb`）：`src/main.js` 新增 `getUrlQueryParam()` 同时解析 search 与 hash 内 `?` 后参数取 token（L221 使用）；`src/router/index.js` 的 `handleExternalToken` 同步改为从该函数取 token（双保险）。

## 验证与归属
- 逻辑单测：hash-only 取到 `ABC123`、search 取到 `SEARCH_OK`、无 token 返回 null ✅
- `npm test`（test 模式 Vite 构建）exit 0；eslint 仅 pre-existing 历史行问题（element-ui 解析、循环依赖、无关 arrow-parens），新增代码合规。
- 子模块提交 `f06ff0e2a`（第一轮）、`54829a6bb`（第二轮）均推送于分支 `develop/v2.6.2-suzhufang`；父仓 gitlink `afab49bd`（第一轮）、`87a67f2`（第二轮）已推送，两端 SHA 一致。
- 真实浏览器联调未执行，需重新构建部署 dev 环境（当时线上仍为旧构建 `f06ff0e`）后由用户用原链接复测。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "token_login_guard",
  "source_extraction_id": "bd3d83a27e7a4ee89e512fee94a0fd18",
  "version": 2,
  "memory_type": "entities"
}
-->