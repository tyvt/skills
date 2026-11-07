# Summary
2026-11-05，用户在家园区一网通办 H5 中观察到登录页覆盖层提示「一网通办retcode状态码为null」且页面卡在「正在登录...」。经分析仓库代码，本地 H5 无 retcode 逻辑，根因为上游一网通办授权回跳未返回有效 retcode，导致 H5 取不到 token 而空转。
# 2026-11-05 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 这是什么问题
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 从截图看，这不是普通的前端 UI 问题，而是「一网通办」登录回调链路里的一个**错误提示浮层**。我先说清楚现象，再定位代码。

**截图现象**
- 页面标题是「登录」，中间是一个加载中的居中场景，蓝色大字是背景页面的「家园区一网通办」。
- 上面盖了一块半透明深灰提示框，写着：`一网通办retcode状态码为null`，下面 `正在登录...`。
- 状态码 `retcode` 拿到的是 `null`，即**一网通办的授权/票据回调没有返回有效的 retcode**，前端在回调解析时判空展示这条文案，然后卡在「正在登录...」。

我先在仓库里定位这条文案和 retcode 处理逻辑，确认根因。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 这个 login.vue 只显示「正在登录...」，没有那条 retcode 提示。提示文案是 `一网通办retcode状态码为null`，说明它在别处——可能在获取 token / 唤起一网通办的入口、或请求封装里。我搜一下 retcode 相关和接口封装。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 这个仓库里没有 `retcode` 相关代码，也没有那条提示文案。说明这条「一网通办retcode状态码为null，正在登录...」的提示**不是本仓库(家园区一网通办 H5/小程序)** 的原生代码，而极可能来自：

1. **承载它的宿主容器**（比如把 H5 嵌进去的 App / 微信小程序 / 苏服办/一方通行 SDK），或
2. 另一个仓库/包里的登录 bridge。

我先核实一下这不是别的页面/组件，再看 URL、页面栈与 token 来源怎么进来的。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 确认了：这个仓库只是拿 `urlToken` 调后端 `ywtbLogin`，没有 `retcode` 相关文案。看下 App.vue 里 token 怎么存的，就能判定提示来源。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 现在完全清楚了。整条链路已经查完，我来解释这条报错到底是什么问题。

## 结论：这是**上游「一网通办」授权回跳没带 retcode**导致的登录失败，不是本地 H5 的 bug

### 判定依据（本仓库代码事实）

1. **入口取 token**：[App.vue](<src/App.vue>) `onLaunch` 从 `window.location.href` 用正则 `/token=([^&#]+)/` 取 `token`，取不到就返回 `null` 存进 `urlToken`。
2. **登录页**：[src/pages/login.vue](<src/pages/login.vue>) `getToken()` 读 `urlToken`，有 token 就调 `ywtbLogin`；没 token（=null）且非开发环境，就**什么都不做，一直停在「正在登录...」**（这也是截图背景残留的原因）。
3. **本仓库里根本没有 `retcode` 这个词，也没有「一网通办retcode状态码为null」这条文案**（全仓 grep 只命中 `urlToken`，无 `retcode`）。

所以那条灰色浮层文案 **不是你当前 H5 页面渲染的**，而是**外层宿主容器 / 一网通办授权桥接 SDK 抛出来的提示**——典型情况：

- App 或小程序容器里，一网通办 SDK（如「苏服办 / 一方通行 / 统一身份认证」授权）回调时解析 URL 出的 `retcode` 为 `null`；
- 容器检测到 `retcode == null` 就弹 toast/浮层「一网通办retcode状态码为null」，并且不会把有效 `token` 拼进 H5 的 URL；
- 因此你的 H5 拿到的 `urlToken` 为 null，登录页转不到首页，卡在「正在登录...」。

### 根因（上游三选一，按概率排序）

1. **授权回跳 URL 没带 retcode / 带错**：一网通办换取票据那一步失败（票据过期、appid/密钥不匹配、回调域名未在白名单），回跳只带了空 retcode。
2. **retcode 参数名/位置不匹配**：上游实际返回 `retCode`/`code`/`authCode`，容器按 `retcode` 解析得 null。
3. **时序问题**：H5 先于容器注入 token 启动（`onLaunch` 只跑一次），URL 里还没拼上 token。

### 建议排查 / 处理

- 在容器 / 一网通办 SDK 侧**抓完整回跳 URL**：确认里面到底有没有 `retcode`、值是否为空，以及有没有同时带 `token`。这一步是关键分水岭。
- 若回跳 URL **完全没有 token** → 问题在**一网通办授权换票环节**（上游/后端），前端无法自愈，需找一网通办对接方核对 appid、回调白名单、票据时效。
- 若是**参数名不一致** → 在容器取出 retcode 的地方兼容 `retCode/code`。
- 前端可做的**兜底健壮性**（防御性，可选）：`login.vue` 现在 token 为空 + 生产环境时是**静默卡死**，建议补一个「取不到 token → 提示重试/回退授权」的分支，避免用户看到永远转圈的「正在登录...」。

**一句话**：截图问题=“一网通办授权回调没返回有效 retcode→本地拿不到 token→登录页空转”，根在上游授权回跳，本地 H5 只是被动卡住。

顺带，这个 `/version/1/app/ywtb/login` 后端接口也在本仓，如果你需要的话，我可以看看后端对 retcode/token 的判空与返回逻辑，进一步确认是"上游没给"还是"后端没换到票"。你想让我往哪个方向继续查？

<!-- MEMORY_FIELDS
{
  "event_name": "一网通办登录页retcode为空",
  "goal": "记录登录报错",
  "summary": "2026-11-05，用户在家园区一网通办 H5 中观察到登录页覆盖层提示「一网通办retcode状态码为null」且页面卡在「正在登录...」。经分析仓库代码，本地 H5 无 retcode 逻辑，根因为上游一网通办授权回跳未返回有效 retcode，导致 H5 取不到 token 而空转。",
  "ranges": "0-24",
  "source_extraction_id": "e6c158a1e7b14728a599573a9cd515c9",
  "version": 1,
  "memory_type": "events"
}
-->