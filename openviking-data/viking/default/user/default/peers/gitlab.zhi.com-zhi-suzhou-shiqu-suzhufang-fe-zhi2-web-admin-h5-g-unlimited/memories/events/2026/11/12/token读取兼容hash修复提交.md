# Summary
2026-11-12，助手在 zhi2-web-admin 的 src/main.js 新增 getUrlQueryParam()（同时解析 search 与 hash 内 query 取 token），并同步修改 src/router/index.js 的 handleExternalToken；逻辑单测与 npm test 通过。子模块提交 54829a6bb 推送至 develop/v2.6.2-suzhufang，父仓 gitlink 87a67f2 推送，两端 SHA 一致；线上仍为旧构建 f06ff0e，需重新部署生效。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: http://unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.dev.zhi.com/
我更新了，还是不行
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 方案：加一个能同时解析 search 与 hash 内 query 的取参函数。

- `main.js` L221：改从「search 优先，其次 hash 内 `?` 后的 query」取 token。
- `router/index.js` `handleExternalToken`：同样处理（虽然主要靠 main.js，但守卫里这段也该一致，双保险）。

写一个内联工具（避免新建公共文件引入新依赖）。先改 main.js：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 现在 router 的 `handleExternalToken`：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 现在还要确认一点：main.js 里 `setToken` 后 token 有效，但 `createInstance` 后路由走到 `#/login`，守卫会走我的 `/login` 分支 → init → 跳 `/index`。但 `handleExternalToken` 里读的是 `window.location.search`，改后 hash 也覆盖了。逻辑闭环。

lint 两个文件：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: main.js 全是 pre-existing 双引号/尾逗号问题（整个文件历史风格），我的新增行用的是单引号，没问题。router 仍是那 10 个历史错误。两个文件都没因我的改动新增错误。构建验证：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 等构建时，我本地起不了线上环境，但可以用本地 dev-server 吗？——不启动。等构建结果，之后本地用 playwright 针对**新构建的预览**验证较麻烦。更稳妥：构建通过后直接推给用户让其重新部署验证，同时我改探针脚本改从 hash 取（其实探针不需改，它验证行为）。

先等构建：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 构建通过（exit 0）。现在验证修复确实生效——我可以把新构建产物在本地用 playwright 起静态服务测，但更直接：改探针脚本直接在本地预览 dist 验证逻辑。不过 dist 是 test 模式产物，需静态服务器+代理后端。

更简单可靠：直接测**修复逻辑本身**——写个小 node 脚本模拟 `location.search=""`、`hash="#/login?token=x"`，跑我的 `getUrlQueryParam` 逻辑确认取到 token：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 逻辑正确：hash 内能取到，search 内也能，无 token 返回 null。

清理临时探针，提交并推送（同样走子模块流程）。先清理探针文件：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 无落后。提交并推送子模块：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 父仓回写 gitlink：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: ahead=1 behind=0，推送父仓：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 两端推送完成，SHA 一致。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 找到真因并修好了。

## 这次的真因（用无头浏览器实测确认）

你的链接是 `http://host/#/login?token=...` —— `token` 在 **`#` 之后（hash 内）**。我用 Playwright 打开你的 URL 实测结果：

- `window.location.search` = **`""`**（空）
- `window.location.hash` = `#/login?token=...`（token 全长在这里）
- `sessionStorage` 为空、`Admin-Token` 不存在、没有发出 `getInfo` 请求 → 登录页原样停留

而代码（`main.js` 和 `router`）都只用 `new URLSearchParams(window.location.search).get('token')` 取 token，对 hash 路由永远取不到。所以上一轮我修的「跳 /index 前先加载权限」那段根本没被触发——**token 压根没写进去**。

## 本次修复

让 token 读取同时兼容 search 与 hash 内的 query：
- `src/main.js`：新增 `getUrlQueryParam()`，search 取不到时解析 `location.hash` 里 `?` 后的参数，用其取 token。
- `src/router/index.js`：`handleExternalToken()` 同理，search 无 token 时改从 hash 内解析（双保险）。

这样：即使 token 写在 `#/login?token=xxx`，也能被识别写入 → 触发上一轮的权限初始化 → 自动进首页。

## 验证

- 逻辑单测：hash-only 取到 `ABC123`、search 取到 `SEARCH_OK`、无 token 返回 null ✅
- `npm test`（test 模式构建）✅ exit 0
- 本地 lint：仅 pre-existing 历史问题，新增代码无新错误
- 真实浏览器：**待你重新部署后复测**（本地无法直连该 dev 后端）

## 提交/推送

- 子模块 `zhi2-web-admin` → `54829a6bb`（已推送）
- 父仓 gitlink → `87a67f2`（已推送），两端 SHA 已核对一致

**关键**：这次要**重新构建部署**到你访问的 dev 环境才会生效（当前线上仍是旧构建 `f06ff0e`，不含此修复）。...

<!-- MEMORY_FIELDS
{
  "event_name": "token读取兼容hash修复提交",
  "goal": "修复并推送token读取",
  "summary": "2026-11-12，助手在 zhi2-web-admin 的 src/main.js 新增 getUrlQueryParam()（同时解析 search 与 hash 内 query 取 token），并同步修改 src/router/index.js 的 handleExternalToken；逻辑单测与 npm test 通过。子模块提交 54829a6bb 推送至 develop/v2.6.2-suzhufang，父仓 gitlink 87a67f2 推送，两端 SHA 一致；线上仍为旧构建 f06ff0e，需重新部署生效。",
  "ranges": "0,33-68",
  "source_extraction_id": "bd3d83a27e7a4ee89e512fee94a0fd18",
  "version": 1,
  "memory_type": "events"
}
-->