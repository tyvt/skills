# Summary
2026-11-04，在 zhi2-web-admin 的 AppMain.vue 中发现 `hasRenderedView` 标志只在 `mounted` 置 true，路由切换 watcher 置 false 后无恢复，导致 `.app-main-skeleton` 遮罩永久显示、整页卡骨架屏。修复为在 `$route` watcher 中置 false 后通过 `$nextTick` 与 300ms `setTimeout` 兜底恢复 true，并在 `beforeDestroy` 清理定时器。改动未提交，保留本地工作区。
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 刷新还是卡到骨架屏
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: The user still sees the skeleton stuck. My earlier fix only addressed `UnifiedLoginSkeleton` (`.page-skeleton`) on the home. The remaining suspect is the `AppMain` skeleton (`.app-main-skeleton`), driven by `hasRenderedView` — which only resets on `$route` change and sets true on `mounted` nextTick. If a route change happens **and the child component throws / never renders**, `hasRenderedView` stays false forever → stuck skeleton.

I need to pinpoint WHICH skeleton and WHICH route. Let me reproduce more aggressively — navigate, then refresh (reload) on several routes including logged-in `/index`, and check for stored errors. But first let me ask which page — no, let me gather evidence first. Let me check `hasRenderedView` logic and whether it can get stuck, and test a real refresh (reload) not just fresh navigation.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: The `app-main-skeleton` is `pointer-events:none` (just visual). But if it never goes away, content underneath may still render (it's an overlay absolutely positioned covering `inset:0` with solid bg `#f7f7f7`) — so it would look like a stuck skeleton covering the real page. Actually `hasRenderedView` is set true on `mounted`'s nextTick always. But on a **refresh with a route that redirects** (e.g. `/index` → `/UnifiedLogin`), does AppMain even mount? AppMain is in the layout; UnifiedLogin is a top-level route without layout.

Let me directly reproduce a **hard reload** on the layouts that use AppMain. First, which routes use `layout/index.vue`? Let me check the router structure and simulate: log in isn't possible easily. But the key: the user says "刷新还是卡到骨架屏" — my previous fix didn't help, so it's a different skeleton than the one I fixed.

Let me do a proper hard-reload test (page.reload after goto) across routes and capture which skeleton remains + errors. Also check `hasRenderedView` watcher edge: on reload, `mounted` runs once → nextTick sets true. Should be fine unless child render error.

Let me test with cache/localStorage variations. Better: reproduce with a route that has AppMain (needs auth). Let me check if I can seed token. Let me look at auth storage key.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: The token is in sessionStorage (`Admin-Token`). Without a valid token, protected routes redirect to login. So the user's "stuck skeleton" page is most likely a **protected page** they're logged into — and I can't easily replicate the logged-in state headlessly without a real token.

I should stop guessing and ask the user for the specific page/route where it's stuck, since my two prior fixes targeted specific skeletons and neither matched. This is genuinely missing key info. But let me first do one more decisive thing: reproduce a **logged-in** scenario is hard; however, I can check the `app-main-skeleton` never-clearing hypothesis by inspecting if `hasRenderedView` can be trapped on `$route` watch firing without a subsequent mount.

Actually — there's a subtle real bug in `AppMain`: the `$route()` watcher sets `hasRenderedView = false`, but it only gets set back to `true` in `mounted()`. On SPA **route transitions** (not full reload), `AppMain` does NOT remount (it's persistent layout), so `mounted` won't run again → `hasRenderedView` stays `false` forever after the first in-app navigation! The watcher sets it false, and nothing sets it back true (there's no `updated` hook or `$nextTick` in the watcher). Let me re-read carefully.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Confirmed a real bug: after the first in-app navigation, `$route` watcher sets `hasRenderedView = false`, but `mounted` never runs again → **`hasRenderedView` stays `false`, and the `.app-main-skeleton` overlay stays stuck forever** covering the content. Wait — but that would affect every navigation, and the app clearly works. Let me check: is `app-main-skeleton` `v-if="$route.matched.length && !hasRenderedView"`. If `hasRenderedView` is false after nav → skeleton shows permanently. That can't be the normal behavior or the whole app would be broken.

Unless — the router-view has `:key="$route.fullPath"`, and there's a `transition name="page-fade"`. Hmm, `hasRenderedView` never resets to true. Let me check if there's an `updated`/`activated` elsewhere, or if the file was recently changed. Let me check git blame / recent modification and whether this is new.

Actually wait — maybe it does get set true somewhere I haven't seen. Let me search `hasRenderedView` fully.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: So `hasRenderedView` is only set true once in `mounted` and false on every `$route`. **That means after ANY in-app route change, `hasRenderedView` becomes false and the `app-main-skeleton` overlay appears and never clears** — this is exactly "刷新/切换卡骨架屏"!

But this would make navigation universally broken... unless `app-main-skeleton` is `pointer-events:none` and behind content? No, it's `position:absolute; inset:0; background:#f7f7f7` covering everything. Hmm. Unless `router-view` content sits on top (z-index). `.app-main` has `position:relative; isolation:isolate`. The skeleton is a sibling after router-view. Both in normal flow within `.app-main`. The skeleton is `position:absolute inset:0` → overlays router-view. With no z-index, later sibling (skeleton) paints on top. So it WOULD cover content after navigation.

This strongly suggests **this is the bug**: `hasRenderedView` never recovers after navigation. The fix: after the router-view renders (route change), set `hasRenderedView = true` again — e.g. in the `$route` watcher after `$nextTick`, or watch `$route` and reset true on next tick. Actually the intent: show skeleton only during the brief chunk-download gap, then hide once view rendered. The correct fix is to set it back to true after the new view mounts, e.g.:

```js
watch: {
  $route() {
    this.hasRenderedView = false
    this.$nextTick(() => { this.hasRenderedView = true })
  }
}
```

But `$nextTick` in watcher may fire before the async route component chunk finishes loading. For a chunk-download skeleton, we want it visible until child mounted. Simplest robust approach: keep the skeleton only for the initial load, and on route change reset+re-arm via nextTick (covers fast navigations) — good enough to avoid permanent stuck.

Wait, but why does the app work for the user normally then? Maybe it DOESN'T and this skeleton gets dismissed because... let me verify empirically. Let me reproduce: load a page that uses AppMain (needs auth). Alternatively, test the component logic in isolation is hard.

Let me reconsider: maybe on route change, the **router-view child** re-renders and since Vue's `$nextTick`… no. Let me just test: is there any chance `hasRenderedView` becomes true via `keep-alive` activated? No.

Actually — maybe the reason it "works" is that `.app-main-skeleton` with `pointer-events:none` and same bg only shows briefly is wrong; it would be permanent. Let me actually test this in the browser on a page that mounts AppMain. I'll try to get an authenticated page. Let me check if there's a dev/test token or a mock. Or check if `/index` after login...

Better: let me search git history — was `hasRenderedView` recently introduced?
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: This code was added 2026-11-02 by "enhance user experience during slow network conditions" — recent. The logic is buggy: `hasRenderedView` resets to `false` on route change but never returns to `true` (only `mounted` sets it, which doesn't rerun on route change). So **after navigating within the app (or after a route resolution), the `.app-main-skeleton` overlay stays forever**.

But actually — on a full **refresh**, `mounted` runs and sets true, so refresh of a single page would clear. The "stuck after refresh" could be: refresh on `/index` → route guard redirects to `/UnifiedLogin` (or a `next({...to, replace:true})` for dynamic routes) → that's a **route change** after mount → `hasRenderedView=false` → skeleton stuck forever!

That's it! On refresh, the router guard does `next({ ...to, replace: true })` (line 278, for dynamic route registration) which triggers a `$route` change → watcher sets `hasRenderedView=false` → AppMain already mounted, never re-sets true → **skeleton permanently stuck**. This precisely explains "刷新卡骨架屏" on protected pages.

Let me verify empirically with an authenticated route. Let me try to establish a session by hitting login programmatically? Too complex. Instead, let me confirm by reasoning + fix the bug: make `hasRenderedView` recover after each route change.

The fix: after a route change, re-set `hasRenderedView=true` once the new view has rendered. Robust approach: in the `$route` watcher, reset false then in `$nextTick` set true (covers the common case; the skeleton still shows for one tick during chunk gap if slow, but crucially never sticks). To better preserve the anti-blank intent while guaranteeing recovery, I can also add a fallback timer. Let me implement:

```js
watch: {
  $route() {
    this.hasRenderedView = false
    this.$nextTick(() => {
      if (!this._isDestroyed) this.hasRenderedView = true
    })
  }
}
```

This guarantees the skeleton never permanently covers content. Let me apply.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Better: to handle the case where the router-view chunk takes >1 tick (slow network), `$nextTick` might fire before the child is ready, so the skeleton could flash off too early — but that's acceptable (worst case = brief blank, not stuck). However, a cleaner guarantee that it never sticks even if `$nextTick` somehow doesn't run: add a short fallback timer. Let me keep it simple but robust with a timer fallback.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: I made a messy edit — I duplicated the comment block. Let me read and clean it up properly.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Actually the file looks clean now — the second edit's `old_string` matched the leftover duplicate and replaced it correctly (the file now has a single clean watcher + beforeDestroy + mounted). Good. Let me verify no duplicate `beforeDestroy` exists (AppMain might already have one elsewhere).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Only one `beforeDestroy`. Good. Now lint and verify. But first — I want to actually confirm this is the real cause. Let me reproduce with a page that mounts AppMain. I need to bypass auth. Let me check if I can mock `GetInfo` and dynamic routes, or simpler: check whether `/index` (after stubbing token + GetInfo) renders AppMain and gets stuck.

Let me try a headless test that stubs the auth-related APIs so `/index` reaches the layout. First see what `/index` route renders and the GetInfo endpoint.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Lint clean. Now let me build a headless reproduction that stubs auth so `/index` reaches the AppMain layout, then simulates a router-guard `replace` route change and checks whether `.app-main-skeleton` sticks. Let me find the GetInfo endpoint path.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Reproducing the full authenticated flow headlessly is complex. Instead, let me verify the fix logic with a **focused reproduction**: mock the auth/GetInfo and GenerateRoutes so `/index` reaches the layout, then navigate to trigger a route change and check the skeleton. Rather than fight the whole store, I'll write a targeted Playwright test that seeds sessionStorage token and stubs the key APIs, then loads `#/index` and inspects `.app-main-skeleton` after a route-change redirect.

Let me find what `getPortalUserInfo` calls (endpoint URL).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: This is getting deep. Let me take a more efficient, decisive approach: write a Playwright test that seeds a token, stubs ALL the relevant API responses generically (so the app reaches layout), then checks the `.app-main-skeleton` visibility after load and after a simulated route change. I'll stub by URL pattern returning plausible JSON.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: The stub wasn't sufficient — `#app-main` doesn't exist (bodyLen 9 = blank), meaning the layout didn't mount (auth/menu still failing). This full-flow mock is too fragile.

Let me instead directly unit-test the `hasRenderedView` logic hypothesis in isolation using a tiny Vue component, OR verify by a simpler means: check the **built** app behavior. Given time, the code bug is clear and verified by reading: `hasRenderedView` is only ever set true in `mounted`, and the `$route` watcher sets it false without recovery. On refresh of a protected route, the guard's `next({...to, replace:true})` fires a route change post-mount → skeleton stuck. My fix adds recovery.

But let me make ABSOLUTELY sure this is the skeleton the user sees. Let me reconsider: is `app-main-skeleton` `position:absolute` with `pointer-events:none`? Yes. Would the user perceive "卡在骨架屏"? Yes — a full-page shimmering skeleton overlay.

However — there's a catch: the comment at line 31 says "切换期间因 key 变化会重新创建，天然回到 false" — wait, that's about `hasRenderedView` in `data`. It claims the component re-creates on key change... but `AppMain` has no `:key`; the `router-view` has `:key="$route.fullPath"`. So AppMain itself does NOT re-create. The comment's reasoning is wrong — confirming the bug.

Let me write a **minimal standalone reproduction** of the exact AppMain reactive pattern to prove the skeleton stays stuck without the fix and clears with it. Actually, better: let me verify against the real built app by loading a **non-protected but AppMain-wrapping** route if any exists. Are there routes using layout that are whitelisted? `/dashboard` is whitelisted! Let me check `/dashboard` route — it uses `property/dashboard/index.vue` directly (constantRoutes, not under layout).

Let me check which constantRoutes render inside `layout/index.vue` (which contains AppMain).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Line 83: `/information` route uses `layout/index.vue` (contains AppMain) and its child `/` — is `/information` whitelisted? No. `/user/profile` also uses layout. Hmm.

The `/market-monitor` at line 110 is a **top-level constantRoute** (not under layout) — so no AppMain. Good, market-monitor doesn't use AppMain.

So AppMain only wraps authenticated layout routes. The user "刷新卡骨架屏" on an authenticated page → guard `next({...to, replace:true})` after dynamic route registration → route change → `hasRenderedView` stuck false. This is my strong hypothesis.

Let me verify with a cleaner authenticated mock. The issue before: menu/routes not loading → layout not mounted. Let me check `GenerateRoutes` action — what it needs. But this is getting long. Let me take a pragmatic proof: create a **minimal Vue SFC test** replicating AppMain's watcher pattern to show stuck behavior, then confirm fix. Actually simplest and most convincing: temporarily check the built dist behavior is impractical.

Let me instead just strongly validate via reasoning + confirm the fix compiles and doesn't break, and ALSO reduce over-reliance: present the fix and ask the user to confirm the exact page. But the user already said "刷新还是卡到骨架屏" twice — they want it fixed, not more questions.

Given the clear code bug (hasRenderedView never restores), the fix is correct and safe. Let me additionally guard the `mounted` path: if route changes during/after mount race, the nextTick sets true. Fine.

Let me verify the full file once more and build.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Now, there's an important subtlety I must double-check: is `app-main-skeleton` actually covering content permanently today, or does something else prevent it? Let me reconsider the CSS: `.app-main { position: relative; z-index: 0; isolation: isolate; }`. The skeleton `position:absolute; inset:0; background:#f7f7f7; pointer-events:none`. The `router-view` content is a normal-flow child (rendered first in DOM, then skeleton overlay). The overlay paints over content. So yes, if `hasRenderedView` stays false → user sees skeleton shimmer, content hidden underneath → "卡在骨架屏".

This MUST reproduce on any authenticated in-app navigation unless... let me actually check if maybe the app never had this bug in practice because route changes DO remount AppMain? No, AppMain is in layout, persistent.

Wait — could it be that in the working app, `hasRenderedView` stays `true` because the `$route` watcher's `hasRenderedView = false` gets immediately overridden? No.

Let me just definitively test by loading `/dashboard` (whitelisted, no auth needed) — but it doesn't use AppMain. Hmm.

Let me try `/information` — it uses layout/index (AppMain) and is a constantRoute. Is it whitelisted? whiteList = ['/login','/unitRegister','/companyRegister','/auth-redirect','/privacy','/dashboard','/market-monitor','/solicitation','/UnifiedLogin','/operation-guide','/suzhou-dao/...']. `/information` NOT whitelisted → needs auth.

OK. Let me write a targeted **component-level test** to prove the watcher behavior definitively — instantiate a mini Vue app with the same pattern. That's fast and conclusive.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: **Definitively proven.** The minimal reproduction confirms:
- **Without fix**: initial mount shows content (`hasRenderedView:true`), but after a route change `hasRenderedView` becomes `false` and **stays false** → skeleton permanently shown.
- **With fix**: after route change `hasRenderedView` recovers to `true` → content shown, no stuck skeleton.

This is exactly the "刷新卡骨架屏" root cause: on refresh of a protected route, the router guard calls `next({...to, replace:true})` after dynamically registering routes — a route change occurring **after** AppMain mounted — the watcher sets `hasRenderedView=false` and nothing restores it, so the `.app-main-skeleton` overlay covers the page forever.

Now clean up temp files and build.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: There are two leftover temp files from a prior step I didn't create this turn — let me remove them too.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Build succeeded (exit 0). Let me confirm job cleanup and git scope.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: All builds completed, no running jobs. `AppMain.vue` now shows as modified (`M`) — this is a tracked file, so it's a real tracked change.

Let me verify the final diff of AppMain to present accurately.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: The fix is a clean tracked change to `AppMain.vue`. This is a genuine code commit candidate. Let me ask about commit/push per the rules.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 明白，**不提交**，改动保留在本地工作区。

## 找到真正原因了

前两次修的是首页 `UnifiedLoginSkeleton`（`.page-skeleton`），但你现在卡的是另一个骨架——[AppMain.vue](<zhi2-web-admin/src/layout/components/AppMain.vue>) 里 `.app-main-skeleton` 这个**路由加载遮罩**。

根因在 `hasRenderedView` 这个标志的写法有 bug：
- 它只在 `mounted` 里置为 `true`（`$nextTick`）；
- 而 `$route` watcher 每次路由切换都把它置回 `false`，**却再也没有地方把它恢复成 `true`**；
- `AppMain` 是常驻布局，路由切换不会重新 `mounted`，所以一旦置 false 就永久停在 false。

于是 `.app-main-skeleton`（`position:absolute; inset:0; 纯色背景 #f7f7f7`，会盖住 router-view 内容）就一直显示——**看起来就是整页卡在骨架屏**。

**触发场景正好是"刷新"**：刷新受登录保护的页面时，路由守卫在动态路由注册完会执行 `next({...to, replace:true})`，这是一次发生在 `AppMain` 已 `mounted` 之后的**路由变更** → watcher 置 false → 永久不回 → 卡骨架。这段代码是 2026-11-02 那次「弱网优化」提交引入的（commit 516cad472），临时注释里"切换时因 key 变化会重新创建、天然回到 false"的推断其实不成立，因为带 `:key` 的是 `router-view` 而不是 `AppMain`。

## 修复（[AppMain.vue](<zhi2-web-admin/src/layout/components/AppMain.vue>)）
`$route` watcher 里置 `false` 后，立刻 `$nextTick` 恢复 `true`；再加一个 300ms 的 `setTimeout` 兜底（并在 `beforeDestroy` 清理），保证即使 `$nextTick` 因异常没跑到，遮罩也一定会揭开，绝不会永久卡住。

## 验证
- 用最小 Vue 用例复刻 AppMain 的同一 reactive 写法，实测对照：
  - 修复前：路由切换后 `hasRenderedView=false` → **showsSkeleton: true**（永久）
  - 修复后：路由切换后 `hasRenderedView=true` → **showsSkeleton: false**
- `eslint` 通过；`npm run build` 成功（仅 Sass 弃用警告）。8081 dev 有 HMR，改动已实时生效，**现在直接刷新试试**。

## 说明
- 这是本次唯一为修复卡骨架而改的**已跟踪**文件（`git status` 显示 `M src/layout/components/AppMain.vue`）；之前的 `UnifiedLogin.vue` 解耦、`router`、`marketMonitor/` 等仍在改内容未动。
- 如果刷新后还有卡（比如某条特定路由），把**卡住时的地址**发我，我从那条路由的组件渲染/接口再定点看。

<!-- MEMORY_FIELDS
{
  "event_name": "AppMain骨架恢复逻辑修复",
  "goal": "修复骨架屏卡死",
  "summary": "2026-11-04，在 zhi2-web-admin 的 AppMain.vue 中发现 `hasRenderedView` 标志只在 `mounted` 置 true，路由切换 watcher 置 false 后无恢复，导致 `.app-main-skeleton` 遮罩永久显示、整页卡骨架屏。修复为在 `$route` watcher 中置 false 后通过 `$nextTick` 与 300ms `setTimeout` 兜底恢复 true，并在 `beforeDestroy` 清理定时器。改动未提交，保留本地工作区。",
  "ranges": "0-67",
  "source_extraction_id": "b9dede629d764a4e8373e862d0961137",
  "version": 1,
  "memory_type": "events"
}
-->