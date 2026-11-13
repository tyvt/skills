# Summary
2026-11-12，诊断并修复 zhi2-web-admin 外链 `#/login?token=...` 打开后仍停留登录页的问题。根因为前端路由守卫 `handleAuthenticatedRoutes` 命中 `/login` 分支时只裸跳 `/index` 而未先加载用户信息（GetInfo）与动态权限路由（GenerateRoutes + addRoute），导致 `/index` 因 roles 为空、动态路由未注册被判无权并回退登录页。token 本身有效（后端 getInfo 实测返回 200）。修复仅在 zhi2-web-admin/src/router/index.js：抽出 initUserAndRoutes() 与 logoutAndRedirect(next)，/login 分支改为 roles 为空时先初始化再跳首页、失败则登出回登录页。npm test 构建通过 exit 0，eslint 仅剩基线既有历史行问题。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: http://unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.dev.zhi.com/#/login?token=eyJhbGciOiJIUzUxMiJ9.eyJ0ZXJtaW5hbF90eXBlIjoiRyIsInVzZXJfaWQiOjIwOTk0MTkwNzU3Mjg0NDEzNDQsInVzZXJfbmFtZSI6IjMwMDgzMiIsInRva2VuX3R5cGUiOiJ1c2VyIiwidG9rZW4iOiI4Mzk5YmQ4OC1iYjc5LTRiNjUtYTk5Yi1lOGQ5ZDE4ZTdmZGQifQ.8wOVcXc7DPhGKXBvxMt6L4PLzpeHDgzm_g4CE1NtRPEN0-txWgBfvdpaOyzOi_JynL5SGSEhfEotCWBxqLh89A
这个url为什么没有自动完成登录，还是停留在登录页
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 已定位到原因，你贴的这条链接**本身有效**（后端确实认它），问题出在前端路由层的处理顺序。

## 结论：token 被写进去了，但登录页把"去首页"的重定向逻辑短路了

关键代码 `zhi2-web-admin/src/router/index.js`：

```js
// 125-142 行：从 URL 的 ?token= 写入 sessionStorage
const handleExternalToken = () => { ... setToken(params.token) ... }

// 214 行 beforeEach
router.beforeEach(async (to, from, next) => {
  handleExternalToken()          // ✅ 先写 token
  ...
  const hasToken = getToken()     // ✅ 这次已能读到 token
  if (hasToken) {
    await handleAuthenticatedRoutes(to, next)
  } ...
})

// 152-156 行：已登录访问 /login 时重定向
if (to.path === '/login') {
  next({ path: '/index', replace: true })   // ⚠️ 关键点
  return
}
```

你的链接是 `#/login?token=...`。守卫里虽然写入了 token，但当 `to.path === '/login'` 时只做了 `next('/index')` 的重定向，**没有 await `GetInfo` 拉用户信息**。而 `handleAuthenticatedRoutes` 里真正"完成登录"（拉 `GetInfo` + 生成动态权限路由 + `router.addRoute`）的这段，在 login 分支处被提前 `return` 跳过了。于是 `/index` 被当作需要权限的路由，`roles` 为空、动态路由还没 add，最终又被打回 `/login`，看起来就停在登录页。

## 我实测的证据

用你这个 token 直连后端（`Authorization: Bearer <token>`，接口 `http://.../api/v2.0/system/user/getInfo`）返回 **200 且带完整 permissions**，说明 token 有效期和身份都没问题——所以不是链接过期，是前端重定向时序的问题。

## 你需要确认的一点

我想先跟你核实，再决定怎么修，避免改错方向：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 明白，我按仓库规则先出计划（含评审 + 人工确认），不动代码。先把要改的 login 分支周边读清楚。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: `main.js` 在启动时会把 `?token=` 写入 sessionStorage（这一步 OK），真正的时序问题就在守卫的 `/login` 分支。计划如下。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 计划已落盘。现在送审（编排器 plan_review）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 审核结论：**Approve（附条件建议）**。它的三条注意点（a/b/c）与我的判断一致，我把它们补进计划作为实施约束，然后交你人工确认。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 计划已通过评审（approve）。核心改动只有 `zhi2-web-admin/src/router/index.js` 的 `/login` 分支：先把用户信息和动态权限路由加载完再跳首页，而不是裸跳后被无权重定向回登录页。请确认是否实施：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 用户已确认。更新计划状态并实施。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 实施完成。验证：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 这些报错绝大多数是既有风格问题（arrow-parens、no-unresolved、no-cycle、comma-dangle L108），都是我改动前就存在的。我确认一下我新增的代码是否引入了新问题——L161/L172 是我新写的箭头函数，只有括号风格问题，与全文件其他行同风格。检查基线：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 基线有 15 个错误、我改后 13 个（还少了 2 个）。剩余的 arrow-parens 是同文件既有风格，本项目 eslint 对全文件历史报错，不算我引入的回归。为了让新增行也符合项目偏好，我对新增的两处箭头函数补括号：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: `--fix` 清掉了全部风格问题，剩 2 个错误（`element-ui` 模块解析、`request` 循环依赖）都是环境/架构性的，且基线也一直存在（基线同样报 no-unresolved）。确认 `--fix` 没改坏逻辑：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: `--fix` 顺便把不相关行的箭头函数也补了括号（纯风格，无语义变化），但为了减少无关 diff，我把这些历史行的风格改动还原，只保留我逻辑改动部分。用 `git checkout` 不能因为要保留我的改动——改为手动还原无关行：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: diff 已收敛为纯逻辑改动（那处 `,` 变 `}` 是 eslint comma-dangle 修复，无副作用）。现在跑 `npm test`（test 模式构建）验证：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 这 10 个错误全在无关历史行（297/300/…/343 的 arrow-parens，及 element-ui/cycle）——都是我改动前基线就有的（基线 15 个，现在 10 个，均非我新增行：我新增代码在 L144-176，全部合规）。等构建结果。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 构建通过（exit 0）。更新进度。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 已完成修复。

## 交付报告

**范围**：外链 `#/login?token=...` 打开后仍停留登录页
**根因**：token 本身有效（实测后端 `getInfo` 返回 200），问题在前端路由守卫——`handleAuthenticatedRoutes` 命中 `to.path === '/login'` 时只 `next({path:'/index'})` 就 `return`，未做 `GetInfo + GenerateRoutes + addRoute`，导致 `/index` 因动态路由未注册、roles 为空被判无权，又被回退到 `/login`。

**改动**（单文件 `zhi2-web-admin/src/router/index.js`）：
- 新增 `initUserAndRoutes()`：把原常规分支的 GetInfo/基础数据/GenerateRoutes/addRoute 抽成共用初始化，只返回成功/失败，`next()` 交由调用方决定（保住常规分支 `next({...to, replace:true})` 携带原目标的语义）。
- 新增 `logoutAndRedirect(next)`：先等 `FedLogOut`（清 token）完成再 `next('/login')`，不带 redirect，避免死循环。
- `/login` 分支：`roles` 为空时先 `await initUserAndRoutes()` 再跳 `/index`，失败则登出回登录页；已有 roles 直接跳首页。

**验证**：
- `eslint src/router/index.js` → 剩 10 个错误，全部是改动前基线就存在的历史行问题（`element-ui` 解析、循环依赖、无关行 arrow-parens；基线原为 15 个，我新增代码行合规），**非本次引入**。
- `npm test`（test 模式 Vite 构建）→ ✅ exit 0。
- 真实页面联调：**未执行**（需在浏览器打开你那条链接验证，可落到 /index 并加载菜单）。请你用原链接复测一下。

**注意**：这是前端行为修复，需要**重新构建部署**到你访问的这个 dev 环境后才会生效——当前线上跑的是 `aa670fa` 构建，尚未包含本改动。

改动落在 `zhi2-web-admin` 子模块，收尾确认：

<!-- MEMORY_FIELDS
{
  "event_name": "token自动登录失效修复",
  "goal": "修复token登录失效",
  "summary": "2026-11-12，诊断并修复 zhi2-web-admin 外链 `#/login?token=...` 打开后仍停留登录页的问题。根因为前端路由守卫 `handleAuthenticatedRoutes` 命中 `/login` 分支时只裸跳 `/index` 而未先加载用户信息（GetInfo）与动态权限路由（GenerateRoutes + addRoute），导致 `/index` 因 roles 为空、动态路由未注册被判无权并回退登录页。token 本身有效（后端 getInfo 实测返回 200）。修复仅在 zhi2-web-admin/src/router/index.js：抽出 initUserAndRoutes() 与 logoutAndRedirect(next)，/login 分支改为 roles 为空时先初始化再跳首页、失败则登出回登录页。npm test 构建通过 exit 0，eslint 仅剩基线既有历史行问题。",
  "ranges": "0-118",
  "source_extraction_id": "4b1665132f60402b90034bcbe9544068",
  "version": 1,
  "memory_type": "events"
}
-->