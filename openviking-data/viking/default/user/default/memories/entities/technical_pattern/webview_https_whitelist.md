# 无锡市区嵌入H5通用webView仅允许https且域名白名单
安全审计要求堵住WebView开放重定向（任意URL加载），通用webView入口需做协议与域名校验。

## 解决方案
- 在common/webView及同类入口加载前校验协议必须为https
- 主机名命中项目维护的白名单，显式拒绝javascript:、data:与非白名单域
- 清理历史无用域名配置（如已不再使用的szf.szzfcjj.cn、txzhwy.cn）
- 配合生产环境去掉会打印Authorization/token的console，并移除废弃ihaAuth整条链路

## 验证与定位
- 会话bbb5f32c：诉求含移除ihaAuth、生产去除console防Token泄露、WebView仅https+白名单
- 用户确认部分域名用不到

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/common/webView.vue、src/App.vue、src/api/index.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：bbb5f32c-e6eb-4a34-80f6-4ee2c2629c62；代码基线：0804e57

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "webview_https_whitelist",
  "source_extraction_id": "2ecfaf2eb90d45a1a96af78198fcde16",
  "version": 1,
  "memory_type": "entities"
}
-->