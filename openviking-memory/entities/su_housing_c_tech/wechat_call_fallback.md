# 苏服办拨号兼容与降级策略
苏住房C 在苏服办 App 与微信环境采用不同拨号方式，微信环境增加 tel: 协议降级以避免页面崩溃。

## 环境差异
- 苏服办 App：使用 jmportal.communication.callPhone，已可用
- 微信：依赖 lightAppJssdk.device.call 与 wx.miniProgram.navigateTo；若不在苏服办小程序 webview 中，wx.miniProgram 不存在会报错

## 微信降级策略
- 优先尝试苏服办 SDK（等待 / 动态加载 jweixin）
- SDK 不可用或调用失败时，自动降级为 tel: 协议拨号
- 用 try-catch 捕获 wx.miniProgram.navigateTo 的同步报错，避免页面崩溃
- 苏服办 App 仍只走官方 SDK，逻辑不变

## 涉及文件
- src/utils/sfb.js、src/pages.json、src/pages/policy/fddydetail.vue、szffluzm/index.html

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：11c71496-2c86-4af0-8987-a08453f769f0
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "wechat_call_fallback",
  "source_extraction_id": "e97a61b113eb4bd1b76ab8df3477a9d8",
  "version": 1,
  "memory_type": "entities"
}
-->