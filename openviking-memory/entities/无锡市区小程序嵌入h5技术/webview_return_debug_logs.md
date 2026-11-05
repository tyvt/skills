# WebView第三方页返回按钮排查日志
无锡市区小程序嵌入H5在第三方URL页面加返回按钮并重定向回业务页时，新增统一前缀[WebViewReturn]的排查日志，控制台过滤WebViewReturn即可看完整链路。

## 日志位置
- 进入webView页：page:onLoad / page:onShow（页面生命周期）
- 初始化iframe：init:ok / init:invalid / init:skip（外链URL、webviewKey）
- iframe加载：iframe:load（重点记录src、matched、reason、hash）
- 子页postMessage：iframeChild:postMessage（iframe内H5通知父页）
- 父页收到消息：iframe:message（origin、type）
- 触发返回：return:trigger（来源iframeLoad / postMessage）
- 退出导航：exit:start / exit:redirectTo:ok|fail / exit:reLaunch:ok|fail

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/common/webView.vue、src/utils/webViewUrl.js、src/pages.js
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：3418c5a2-4fda-48cf-98cf-7a8c6d1ea069

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "webview_return_debug_logs",
  "source_extraction_id": "801fd2bc9b8d4766aafa742c6fc75b71",
  "version": 1,
  "memory_type": "entities"
}
-->