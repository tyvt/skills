# 全局wx对象被覆盖的双层防护修复
uni-app会向window.wx写入空对象覆盖苏服办JSSDK，导致wx.miniProgram不可用，已用守卫脚本与二次恢复修复。

## 问题根因
- uni-app在启动时向window.wx写入{}，覆盖苏服办JSSDK注入的真实wx
- 导致wx.miniProgram.navigateTo等方法丢失，人脸识别流程报错
- wx.miniProgram仅微信小程序web-view内有效，普通浏览器或苏服办APP原生容器无此方法

## 修复方案
- index.html内联守卫脚本（主防护）：苏服办JSSDK之后、应用主包前安装；监听window.jWeixin赋值；Object.defineProperty拦截window.wx在uni-app写入{}时保留真实JSSDK；轮询等待jweixin异步加载
- src/utils/restoreWeixinWx.js + src/main.ts二次恢复：应用启动后再调用restoreWeixinWx()作为兜底

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证方式：重新部署dist后在微信webview控制台执行wx.miniProgram应有navigateTo等方法
- 所属项目：无锡市区小程序嵌入H5；来源会话：718e1271-a4de-433f-9316-5f9d2f58fafe
- 涉及文件：index.html、src/utils/restoreWeixinWx.js、src/main.ts
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "wx_override_guard_fix",
  "source_extraction_id": "9d334abc52e0456abf2471f8e4566102",
  "version": 1,
  "memory_type": "entities"
}
-->