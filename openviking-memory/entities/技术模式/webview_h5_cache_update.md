
# web-view 内 H5 缓存更新方案
微信小程序 web-view 嵌入的 H5 在用户不清缓存时也能更新版本的技术方案与取舍。

## 问题本质
- 小程序 web-view 的 H5 HTTP 缓存（HTML/JS/CSS）独立于小程序包缓存，清小程序缓存不会清除它。
- 更新思路是让浏览器自己判断拉新版本，而非依赖用户清缓存。

## 推荐方案
- 静态资源带 content hash（Vite 默认开启）：HTML 更新后引用新文件名，旧缓存自然失效。
- HTML 禁止缓存（nginx 加 `Cache-Control: no-cache`）：核心配置，用户无感更新。
- 小程序 web-view 的 src 在 `#` 前拼时间戳参数 `?t={毫秒时间戳}`（如 `Date.now()`）：让历史已缓存用户立刻生效。
- 2026-11-13 本次会话确认放弃写死版本号方案（`?v=`），改用时间戳方案。
- 前端轮询 `version.json` 做版本检测：解决长时间停留 H5 期间发版的场景。

## nginx 配置
- HTML（入口 `/wechatapph5/`）：`Cache-Control: no-cache`
- assets（带 hash 文件名如 `index-BmIXwnd0.js`）：`Cache-Control: public, max-age=31536000, immutable`
- 外层 nginx（9680/443 反代层）转发到 10001；缓存头需加在真正响应 `/wechatapph5/` 的 location 上。
- add_header 继承坑：location 内加 add_header 会导致不再继承上层，需把 server/http 层原有 add_header 原样抄到 location 内，再追加缓存头。

## 关键结论
- nginx 配 HTML no-cache 只对未来请求生效；已缓存的历史用户需靠换 URL 时间戳参数穿透缓存。
- token 不能替代时间戳：拼在 `#` 后不参与 HTTP 请求；拼在 `#` 前会重新引入会话固定漏洞且每次登录变导致重复下载。
- 生产入口地址示例：`https://sipps.sipac.gov.cn/wechatapph5/?t={毫秒时间戳}#/`
- 时间戳方案代价：每次打开都完整下载 HTML（无 304）、失去灰度控制、日志按 URL 聚合会碎；index.html 很小可忽略。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "webview_h5_cache_update",
  "source_extraction_id": "ab6df718179645ddb2d1380ab79511b9",
  "version": 2,
  "memory_type": "entities"
}
-->