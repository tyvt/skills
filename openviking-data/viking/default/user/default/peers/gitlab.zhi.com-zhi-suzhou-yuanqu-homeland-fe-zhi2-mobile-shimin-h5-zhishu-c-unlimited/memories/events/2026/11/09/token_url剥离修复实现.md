# Summary
2026-11-09，在 zhi2-mobile-shimin 的 src/App.vue 新增 stripTokenFromUrl()（读取 token 后立即用 history.replaceState 从地址栏剥离 token/isphone，处理 # 前与 # 后 query）与 isEntryRoute()（仅入口页 pages/login 消费 URL token）；在 src/pages/login.vue 新增 clearUrlToken() 实现 token 一次性消费，读取后立即清除 urlToken 缓存，阻断分享链接复用 token 的利用路径。uni build 构建通过，改动已编译进 dist。
# 2026-11-09 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 当前H5会做为web-view嵌入其他微信小程序，当用户分享小程序页面的，会携带url上的token，导致其他用户打开后直接使用了携带的token登录，获取了其他用户的登录状态
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: Worktree created (git writes progress to stderr, not an error). Now let me implement the fix in the worktree. First `App.vue`:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: Now I'll rewrite the top portion of `App.vue` with the security fix. Key design decisions:

- **`stripTokenFromUrl()`**: remove `token`/`isphone` params from BOTH the pre-hash search and the post-hash query, then `history.replaceState` — so the address bar (and any share) no longer contains the token.
- **Entry-only consumption**: The token is only accepted at the genuine H5 entry. Since the login page is the `home` page, the token is intended for initial launch. To distinguish a legit launch from a shared deep link, I check that: no existing active user session, AND `urlToken` has not already been consumed. But the strongest defense is stripping from URL + one-time consumption. Additionally, only read the token if the current route is the entry/login page (not a shared sub-page). If user B opens a shared link to `/pages/vote`, they should land on vote → 401 → login flow, and any token that came from the shared URL should NOT auto-login.

Let me implement:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: Now `login.vue` — one-time consumption: after a successful token login, clear `urlToken` so it can't be reused; and skip token login if already logged in with a different/any existing session (unless the token is freshest legitimate entry). The most important: **clear `urlToken` after consumption** so re-entering the H5 later won't reuse a stale token, and only login via token if not already authenticated.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: Now consume the token once used in `performLogin`. Clear it right after reading (before the request) so it can't be reused even if the request fails, and definitely after success.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: ...token=原用户token`，其他用户打开后其 H5 读到该 token 并自动登录，**直接获得原用户登录态**（会话固定/登录态劫持）。

### 修复内容（2 个文件）
1. **`src/App.vue`**
   - 新增 `stripTokenFromUrl()`：读取后立即用 `history.replaceState` 把 `token`/`isphone` 从地址栏（`#` 前 query 与 `#` 后 query 都处理，保留其它参数）剥离，**地址栏不再残留 token，二次分享无法再带出**。
   - 新增 `isEntryRoute()`：只有真实入口页（`pages/login`，即 `home` 页）才消费 URL 上的 token；分享/深链到子页面时**一律忽略** URL 携带的 token，不会自动登录到他人账号。

2. **`src/pages/login.vue`**
   - 新增 `clearUrlToken()`：token **一次性消费**，读取后立刻清除 `urlToken` 缓存，防止 token 被重复复用（会话固定）。

### 验证
- URL 剥离逻辑已用多组用例单测通过（`?token=&isphone=`、hash 内 token、子页、首/尾参数、其它参数保留均正确）。
- `uni build` **构建通过**（`DONE Build complete....

<!-- MEMORY_FIELDS
{
  "event_name": "token_url剥离修复实现",
  "goal": "修复会话固定漏洞",
  "summary": "2026-11-09，在 zhi2-mobile-shimin 的 src/App.vue 新增 stripTokenFromUrl()（读取 token 后立即用 history.replaceState 从地址栏剥离 token/isphone，处理 # 前与 # 后 query）与 isEntryRoute()（仅入口页 pages/login 消费 URL token）；在 src/pages/login.vue 新增 clearUrlToken() 实现 token 一次性消费，读取后立即清除 urlToken 缓存，阻断分享链接复用 token 的利用路径。uni build 构建通过，改动已编译进 dist。",
  "ranges": "0,30-36,108-112",
  "source_extraction_id": "4a45c2f9a945485dbc39ad0e7769ff2d",
  "version": 1,
  "memory_type": "events"
}
-->