# Summary
2026-11-12，用户反馈 zhi2-web-admin 外链登录更新后仍停留在登录页。助手用 Playwright 无头浏览器实测确认：外链 URL 为 `http://host/#/login?token=...`，token 位于 hash 内，而代码从 `window.location.search` 读取（为空），导致 token 从未写入、登录页原样停留。此前 f06ff0e 修复的 /login 分支跳转逻辑因 token 未进入而未触发。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: http://unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.dev.zhi.com/
我更新了，还是不行
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 先确认新构建是否真的带上我的修复。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 部署已是新构建（commit f06ff0e，build-time 15:19），我的修复已在线上。既然还不行，说明我的根因判断不完整。我需要看真实浏览器行为，而不是继续猜。

先确认几件事：新 token 我这边测 `getInfo` 是否仍 200、以及页面实际路由跳转。先问你拿到现象细节，同时我先复测 token。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 好，等你贴控制台。同时我先自己复测这个 token 现在是否还有效（可能已过期）：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: token 仍有效（getInfo 200）。那问题在前端。现象是"登录页表单原样停留"——说明我的 `/login` 分支初始化后跳 `/index` 又被弹回，或根本没进到那段。等你的控制台输出能定位具体哪一步。

同时我先自查一个关键点：`handleExternalToken` 用 `window.location.search` 取 token，但 URL 是 **hash 路由**（`#/login?token=...`）。`window.location.search` 对 `http://host/#/login?token=x` 是**空的**——token 在 hash 里！这可能是真根因。核实：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 确认了：`main.js` 和 `router` 都从 `window.location.search` 取 token，但你的 URL 是 `http://host/#/login?token=...`，query 在 **hash 内**，`window.location.search` 为空 → token 从未被写入。这才是"表单原样停留"的真因；上一轮我修的是第二个问题（即便 token 进来了，跳 /index 也会被弹回），但第一个问题（取不到 token）才是当前现象。

不过要先验证：token 可能确实写在 search（有些系统把 token 放 `?` 前）。你的链接是 `...zhi.com/#/login?token=...`，`#` 在 `?` 前，所以是 hash 内。我确认线上 build 的 JS 也是这种取法，并确认正确取法：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 入口是预加载壳，真实逻辑在 `module-main-COFvfnuH.js`。检查其中取 token 的方式：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 确认了：线上代码 `new URLSearchParams(window.location.search).get("token")` 和 router 的 `window.location.search` —— 你 URL 里 `token` 在 `#` 之后，`location.search` 取不到。这就是"表单原样停留"的真因。

但等等——如果 token 真没写进去，`#/login` 是白名单，会正常显示登录页，符合现象。逻辑自洽。

不过要谨慎：有些网关会把 `#` 前也拼上 query。为免误判，我用无头浏览器实测一次最稳。先看环境有没有可用的自动化工具：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 有 playwright。用无头浏览器实测你的 URL，抓取实际路由和 console/network：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 这只是诊断探针脚本。先登记 todo 再写：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 铁证：

- `sessionStorage` 为空，`Admin-Token` 不存在
- `location.search` = **`""`**，token 全在 `location.hash`（`#/login?token=...`）
- 没有 `/system/user/getInfo` 请求（只有 platformConfig），登录页原样显示

真因确认：token 在 **hash 内**，而代码从 `window.location.search` 取，永远取不到。我上一轮改的 `/login` 跳转逻辑根本没被触发（因为 token 没进来）。

修复：让 `main.js`、`router/index.js` 的 token 读取同时支持 search 和 hash 内的 query。先读 `main.js` 相关段确认改点：

<!-- MEMORY_FIELDS
{
  "event_name": "外链登录token根因定位",
  "goal": "定位登录页停留根因",
  "summary": "2026-11-12，用户反馈 zhi2-web-admin 外链登录更新后仍停留在登录页。助手用 Playwright 无头浏览器实测确认：外链 URL 为 `http://host/#/login?token=...`，token 位于 hash 内，而代码从 `window.location.search` 读取（为空），导致 token 从未写入、登录页原样停留。此前 f06ff0e 修复的 /login 分支跳转逻辑因 token 未进入而未触发。",
  "ranges": "0-31",
  "source_extraction_id": "bd3d83a27e7a4ee89e512fee94a0fd18",
  "version": 1,
  "memory_type": "events"
}
-->