# 中转页多接口共用单一 loading 深度计数
苏住房C 扫码/分享中转页并发多接口，用 _apiLoadingDepth 与 trackApi 包装保证全页只有一个 loading。

## 问题现象
- onLoad 并发发起 getUserInfo、listComplexCommunitySubdistrictByToken、getTokenV1、埋点 eventDataAdd 等多个互不相关接口
- uni.showLoading/hideLoading 全局单例计数，先返回的接口会 hideLoading 掉别人未完成的 loading，界面闪烁
- 原 lanch() 自带 showLoading 在埋点未完成时就 hideLoading，属同类误关

## 根因
- uni.showLoading/hideLoading 是全局单例计数，多个接口各自 show/hide 时无法协调，先完成者误关他人 loading

## 解决方案
- 页面实例维护 _apiLoadingDepth，封装 _beginApiLoading/_endApiLoading（0→1 才 showLoading，回到 0 才 hideLoading）
- 封装 trackApi(promise)：非 Promise 直接 Promise.resolve 透传，否则 begin 后用 .finally(end) 保证成功失败都关
- 所有接口调用一律包 this.trackApi(...)，埋点再包 eventDataAddWithLoading 复用同一计数
- onUnload 时循环 end 直到深度归 0，避免离开页面后 loading 残留
- 该套路可搬到任何「一屏多请求」中转/聚合页，新增接口只需包一层 trackApi 即自动接入

## 验证与归属
- 所属项目：苏住房C；来源会话：3446b277-c59f-4c0d-8572-2a95877d79e3；代码基线：97a1f31
- 涉及文件：src/pages/redirect/index.vue、src/store/user.js、src/api/appAnalytics.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "redirect_loading_depth",
  "source_extraction_id": "f6816503b931464c9b89b467f68dad1b",
  "version": 1,
  "memory_type": "entities"
}
-->