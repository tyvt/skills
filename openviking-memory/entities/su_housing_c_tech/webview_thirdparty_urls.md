
# 苏住房C第三方 web-view 地址汇总
苏住房C（zhi2-mobile-shimin）项目中所有 web-view 相关地址已梳理汇总。

## Web-view 承载页
- pages_main/common/webView.vue：通用 web-view 容器
- pages_main/common/webViewNav.vue：带导航栏偏移的 web-view 容器
- pages_transaction/thirdMap/index.vue：直接内嵌 <web-view>

## 硬编码第三方地址（域名 cc.szfcweb.cn:9999）
- https://cc.szfcweb.cn:9999/pages/policy/zzsscs：二手房住宅交易税收测算，入口 pages_transaction/taxGuide/index.vue
- https://cc.szfcweb.cn:9999/pages/policy/fzzsscc：二手房非住宅交易税收测算，入口 pages_transaction/taxGuide/index.vue

## 验证与归属
- 涉及文件：webView.vue、webViewNav.vue、thirdMap/index.vue、taxGuide/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：c5d58c85-6292-401f-b7fb-abc1ca9f514c；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "webview_thirdparty_urls",
  "source_extraction_id": "0696f333cb154a068fcf85a0537f1632",
  "version": 1,
  "memory_type": "entities"
}
-->