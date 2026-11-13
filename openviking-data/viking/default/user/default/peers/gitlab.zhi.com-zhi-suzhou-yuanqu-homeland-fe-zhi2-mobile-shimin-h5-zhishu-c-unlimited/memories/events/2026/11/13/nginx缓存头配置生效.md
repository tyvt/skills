# Summary
2026-11-13 生产 nginx 对 `/wechatapph5/` 入口的 HTML 请求加上 `Cache-Control: no-cache`，对带 hash 的 assets 文件（如 index-BmIXwnd0.js）加上 `Cache-Control: public, max-age=31536000, immutable`，验证生效。location 内加 add_header 需把 server/http 层原有安全头原样抄入，否则继承失效。
# 2026-11-13 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 现在是这样的，改完nginx之后应该多什么？
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 改完 nginx 后，这张图里的 Response Headers 会多出一条 `Cache-Control`，按资源类型分两种：

**1. 你截图选中的这种 assets 文件（`common.CfD0-3ZH.js`、`index-BmIXwnd0.js` 等，文件名带 hash）：**

```
Cache-Control: public, max-age=31536000, immutable
```

出现这条即表示改对了——浏览器一年内直接用本地副本，连 304 请求都不发。

**2. HTML（入口文档 `/wechatapph5/` 的那次请求，Network 里选 Doc 类型那条）：**

```
Cache-Control: no-cache
```

注意两点：

- 验证时把 DevTools 顶部的 **Disable cache 取消勾选**再看效果——勾着它时浏览器每次都强制回源，看不出缓存策略是否生效；但 **Response Headers 无论勾不勾都会显示**，所以你现在就可以用它确认 nginx 是否已经加上。
- 图里 Request Headers 中的 `Cache-Control: no-cache` 是 DevTools 的 Disable cache 注入的请求头，不是我们要验证的东西，别看混了。

**验证步骤**：nginx reload 后，在这个页面 Network 里分别点一条 assets JS 和 Doc（HTML）请求，确认前者多了 `immutable` 强缓存、后者是 `no-cache`，就算到位。其余头（Etag、Last-Modified 等）不用管，保持原样。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 这张截图说明**配置还没生效**——Response Headers 里依然没有 `Cache-Control`（只有 Etag、Last-Modified 这些原有的）。HTML 这次请求是 200 直接返回，也没有任何缓存策略头，和改动前一模一样。

按顺序排查三点：

**1. 确认 reload 是否真的执行了**
改完 conf 后要 `nginx -t` 通过再 `nginx -s reload`（或面板里 Reload）。可以看 error.log 是否有 reload 记录、或对比进程启动时间。

**2. 确认改的是“真正响应这次请求”的那个 server 块**
这点是关键：入口请求 `https://sipps.sipac.gov.cn/wechatapph5/` 到达的是**外层 nginx**（你之前贴的那份，9680/443 反代层），它再转发到 10001。如果你只改了 10001 的 server 块，header 正常应该会透传回来（nginx 默认不隐藏 Cache-Control）——但现在没透传出来，说明两种可能：
   - 实际响应这次请求的另有 server 块（比如外层某段直接 root 到 dist，或者 `/wechatapph5/` 转发的目标不是你改的那个 10001 块）；
   - 或外层某处有 `proxy_hide_header Cache-Control` 把头剥掉了。

**3. 定位方法（在外层 nginx 上执行）**
```powershell
# 看外层哪段配置在处理 /wechatapph5/
Select-String -Path D:\nginx-1.26.3\conf\*.conf,D:\nginx-1.26.3\conf\conf.d\*.conf -Pattern "wechatapph5"
```
找到那段后，把 no-cache 的 `add_header` 直接加在**那个 location** 里（反代的话用 `proxy_hide_header Cache-Control;` + `add_header Cache-Control "no-cache" always;`），reload 后再刷新页面验证。

补充一个积极信号：HTML 响应里已经有 `Etag`，说明一旦 Cache-Control: no-cache 生效，后续每次打开都会是轻量的 304 条件请求，方案闭环没问题。

把外层那段 `/wechatapph5` 的配置贴给我，我直接告诉你加在哪几行。
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: location里面不允许加add_header，否则nginx.conf的全局add_header不生效
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 对，你说的这个坑是真的——nginx 的 `add_header` 继承规则是“**只要当前层级有自己的 add_header，就完全不再继承上层**”。location 里加了一条 `Cache-Control` 后，server/http 层原有的 add_header（比如 CSP、X-Frame-Options 那些安全头）对这段 location 就全部失效了。

但不是“不允许加”，而是**加了之后要把上层的 add_header 原样抄一遍**。两种改法：

**方法 A（推荐）：location 内补齐上层所有 add_header**

```nginx
location /wechatapph5/ {
    proxy_pass http://...;
    # —— 把 server/http 层原有的每一条 add_header 原样抄到这里 ——
    add_header X-Frame-Options "SAMEORIGIN";        # 示例，按实际抄
    add_header X-Content-Type-Options "nosniff";    # 示例，按实际抄
    # —— 再加缓存头 ——
    proxy_hide_header Cache-Control;
    add_header Cache-Control "no-cache" always;
}
```

**方法 B：把缓存头提加到 server 层，location 一个都不写 add_header**

如果整站都是静态资源 + HTML，可以只在 server 层加 `add_header Cache-Control "no-cache" always;`，所有 location 都不出现 add_header，全局继承不被打断；带 hash 的 assets 强缓存用 regex location 单独给——但那个 regex location 同样会失去 server 层的头，所以它里面也得抄一遍。

**实操建议**：先把你们生产 server/http 层现有的 add_header 列出来（`Select-String -Path nginx.conf -Pattern 'add_header'`），有几条、在哪个层级，然后按方法 A 在目标 location 里抄全 + 加 Cache-Control，`nginx -t` 后 reload。之前截图里 HTML 响应连 CSP 之类的安全头都没看到，所以也可能上层本来就没几条 add_header，抄起来负担很小。

把 `Select-String add_header` 的结果和外层 `/wechatapph5` 的 location 段贴给我，我给你拼好最终片段。
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 算是改好了吗
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: ✅ 算改好了，两张截图正是我们要的结果：

| 资源 | 响应头 | 结论 |
|---|---|---|
| HTML（`/wechatapph5/?t=...`） | `Cache-Control: no-cache` | ✓ 每次回源验证，新版立即可见 |
| assets（`index-BmIXwnd0.js` 等带 hash） | `Cache-Control: public, max-age=31536000, immutable` | ✓ 一年强缓存，不发重复请求 |

服务端这半边收口了。剩下的收尾两件事：

1. **小程序侧**：把 `?t={毫秒时间戳}` 拼在 `#` 前的最终 URL 格式发给第三方上线（就是之前定稿的那条）。它负责把**存量用户**手里已缓存的旧 HTML 冲掉——nginx 配置只对配置生效之后的请求起作用。
2. **真机验证**（可选但建议）：手机上打开小程序 web-view，杀掉重进一次，之后 H5 发个新版，不清缓存确认能直接看到新版页面。

两边都上线后，这个缓存问题就是双保险闭环：日常发版靠 nginx no-cache 自动生效，小程序的时间戳兜底冲历史缓存。

<!-- MEMORY_FIELDS
{
  "event_name": "nginx缓存头配置生效",
  "goal": "确认nginx缓存配置",
  "summary": "2026-11-13 生产 nginx 对 `/wechatapph5/` 入口的 HTML 请求加上 `Cache-Control: no-cache`，对带 hash 的 assets 文件（如 index-BmIXwnd0.js）加上 `Cache-Control: public, max-age=31536000, immutable`，验证生效。location 内加 add_header 需把 server/http 层原有安全头原样抄入，否则继承失效。",
  "ranges": "48-77",
  "source_extraction_id": "ab6df718179645ddb2d1380ab79511b9",
  "version": 1,
  "memory_type": "events"
}
-->