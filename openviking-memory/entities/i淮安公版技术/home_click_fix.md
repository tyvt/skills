# i淮安公版 home.vue 点击无响应修复
i淮安公版 H5 首页用户卡片点击无响应体验问题的修复记录。

## 问题背景
- 原「去登录」等交互点击后静默无响应，用户无反馈。

## 修复方案
- 给整块用户卡片 `user-card` 加点击，直接触发 `handleUserEntry`（不再只依赖小范围点击区域）。
- `goLogin()` 每次点击先执行 `detectMiniProgramEnv()` 与 `initMiniProgramMessageListener()`。
- 点击后逻辑：发送成功提示「已请求微信登录」；未成功提示「请在小程序 web-view 中打开」/「请稍后重试」。
- 若检测到 `miniprogram` 但桥未就绪，在 `WeixinJSBridgeReady` 后再补发一次 `requestLogin`。
- 涉及文件：src/pages/index/home.vue；所属项目：i淮安公版；来源会话：e7ab2701-0d0c-4c0d-b39d-ab250ce924e8。

<!-- MEMORY_FIELDS
{
  "category": "i淮安公版技术",
  "name": "home_click_fix",
  "source_extraction_id": "278ce1504f244ed5ae52916d18ff2312",
  "version": 1,
  "memory_type": "entities"
}
-->