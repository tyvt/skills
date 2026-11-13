# Summary
2026-11-13 确认小程序 web-view 加载 H5 的最终 URL 格式：`https://sipps.sipac.gov.cn/wechatapph5/?t={当前毫秒时间戳}#/`（带业务参数时 `#/?token=xxx&isphone=1`）。规则：时间戳拼在 `#` 前、业务参数保留在 `#` 后，每次进入取当前毫秒时间戳不写死。用户将转发给第三方修改小程序端。
# 2026-11-13 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 用时间戳方案，给我一个示例，我发给第三方修改
...
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 给一个最终格式示例就行了，不要代码
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: ## web-view 加载 H5 的 URL 最终格式

```
https://xxx.sipac.gov.cn/wechatapph5/?t={当前毫秒时间戳}#原有hash路由及参数原样保留
```

示例（假设原地址是 `https://xxx.sipac.gov.cn/wechatapph5/#/pages/login?token=xxx&isphone=1`）：

```
https://xxx.sipac.gov.cn/wechatapph5/?t=1731470000000#/pages/login?token=xxx&isphone=1
```

**规则（发给第三方的三条）：**

1. 时间戳参数 `t` 必须拼在 **`#` 之前**、路径之后；已有 `?` 用 `&` 追加，没有用 `?` 开头。
2. `#` 后面的路由和参数（含 token）**原样保留，不动**。
3. 每次进入 web-view 都用当前时间戳（`Date.now()`，毫秒级），不要写死。
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: https://sipps.sipac.gov.cn/wechatapph5/#/
生产地址是这个，对方应该直接配置的是这个地址
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 那就更简单，最终格式如下，直接发给第三方：

```
https://sipps.sipac.gov.cn/wechatapph5/?t={当前毫秒时间戳}#/
```

示例（某次实际加载时生成的样子）：

```
https://sipps.sipac.gov.cn/wechatapph5/?t=1731470000000#/
```

**给第三方的三条规则：**

1. 在原配置地址 `https://sipps.sipac.gov.cn/wechatapph5/#/` 的 `#` 之前插入 `?t=` + 当前毫秒时间戳，`#/` 及后续路由原样保留。
2. 每次进入 web-view 都取当前时间戳（毫秒），不要写死固定值。
3. 若后续有带 token 等参数的跳转地址，规则相同：时间戳加在 `#` 前的路径上，`#` 后面内容一律不动。

时间戳每次变化会让 WebView 视为不同地址，从而绕过缓存的旧 H5 页面，保证用户无需清缓存即可使用最新版本。服务端 nginx 缓存头配置我们同步在调整，此项改动独立生效、无上线顺序依赖。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: ## 最终 URL 格式（含 token）

```
https://sipps.sipac.gov.cn/wechatapph5/?t={当前毫秒时间戳}#/pages/login?token={token}&isphone={isphone}
```

示例：

```
https://sipps.sipac.gov.cn/wechatapph5/?t=1731470000000#/pages/login?token=abc123def456&isphone=1
```

**给第三方的规则：**

1. **`#` 之前**只放缓存时间戳：路径 `.../wechatapph5/` 后拼 `?t=` + 当前毫秒时间戳，每次进入都重新取值。
2. **`#` 之后**放业务参数：`#/pages/login?token=xxx`（以及原有的 isphone 等参数），格式与现在保持一致，**不要把 token 拼到 `#` 前面**——H5 端会解析 hash 里的 token 并自动从地址栏清除，放 `#` 前会停留在外层 URL 上，有被分享劫持的风险（此前已处理过这个问题）。
3. 时间戳与 token 互不干扰：token 每次登录变化、时间戳每次进入变化，都在各自位置上正常追加/替换，不重复堆叠。

这样 WebView 每次都会因 `?t=` 变化重新拉取最新 H5，token 照常通过 hash 传递并按现有逻辑消费、清理。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: ## 最终 URL 格式

```
https://sipps.sipac.gov.cn/wechatapph5/?t={当前毫秒时间戳}#/?token={token}&isphone={isphone}
```

示例：

```
https://sipps.sipac.gov.cn/wechatapph5/?t=1731470000000#/?token=abc123def456&isphone=1
```

**给第三方的规则：**

1. `#` 之前：`.../wechatapph5/` 后拼 `?t=` + 当前毫秒时间戳，每次进入重新取值。
2. `#` 之后固定根路径 `#/`，token、isphone 等业务参数直接挂在 `#/` 后面（`#/?token=xxx&isphone=1`），H5 端会自动解析并从地址栏清理 token。
3. 不带 `/pages/login`，登录跳转由 H5 内部自己处理。

<!-- MEMORY_FIELDS
{
  "event_name": "webview地址格式定稿",
  "goal": "定稿webview地址",
  "summary": "2026-11-13 确认小程序 web-view 加载 H5 的最终 URL 格式：`https://sipps.sipac.gov.cn/wechatapph5/?t={当前毫秒时间戳}#/`（带业务参数时 `#/?token=xxx&isphone=1`）。规则：时间戳拼在 `#` 前、业务参数保留在 `#` 后，每次进入取当前毫秒时间戳不写死。用户将转发给第三方修改小程序端。",
  "ranges": "17,30-47",
  "source_extraction_id": "ab6df718179645ddb2d1380ab79511b9",
  "version": 1,
  "memory_type": "events"
}
-->