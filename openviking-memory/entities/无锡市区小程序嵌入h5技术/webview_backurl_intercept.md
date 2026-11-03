# 小程序web-view拦截第三方backUrl回自家首页
pages/common/webView 加载带返回按钮的第三方页时，若 backUrl 命中自家门户首页 hash，必须在小程序侧 redirectTo/reLaunch 原生首页，禁止在 web-view 内再开首页。

## Description
- 容器：pages/common/webView 或 H5 外链容器
- 问题：第三方 backUrl/重定向命中自家门户首页 hash（如 szh5/sfb/#/）时，不可在 iframe 内再打开一层首页
- Android 第二次进投票页点返回可能无反应：首次 redirectTo 成功后栈变化致 iframe load 不触发，须并行依赖 iframe postMessage 与 URL 匹配（inspectPortalHomeReturnUrl）

## 日志与排查
- 统一前缀 [WebViewReturn] 日志：page:onLoad、iframe:load（matched/reason/hash）、iframe:message、return:trigger、exit:redirectTo:ok|fail
- 增加 logWebViewReturn 与 inspectPortalHomeReturnUrl 辅助定位

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：3418c5a2-4fda-48cf-98cf-7a8c6d1ea069
- 代码基线：1cce226
- 涉及文件：webView.vue、webViewUrl.js

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "webview_backurl_intercept",
  "source_extraction_id": "d81982be12fb49649927c1f09cdc1a12",
  "version": 1,
  "memory_type": "entities"
}
-->