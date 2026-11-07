# wx全局覆盖修复
uni-app 主包覆盖 window.wx 导致微信 web-view 内 H5 的 wx.miniProgram 为空，需用守卫与兜底恢复。

## 问题根因
- uni-app 主包会覆盖 window.wx，覆盖 jweixin 注入的真实 JSSDK
- 微信 web-view 内 H5 报 wx.miniProgram.navigateTo 不存在，wx 被写成 {}

## 解决方案
- 在 index.html 苏服办 JSSDK 之后加内联守卫：监听 jWeixin、用 defineProperty 拦截对 wx 的空对象写入
- main.ts 启动时再调 restoreWeixinWx() 兜底
- 重新部署 dist 后在 web-view 控制台验证 typeof wx.miniProgram.navigateTo === 'function'
- 注意 miniProgram 仅微信小程序 web-view 有效，苏服办原生容器无此 API 属环境限制

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话 718e1271 用户怀疑框架覆盖 wx；结论采用 index.html 守卫 + restoreWeixinWx.js 两层防护
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/index.html、src/utils/restoreWeixinWx.js、src/main.ts
- 所属项目：无锡市区小程序嵌入H5；来源会话：718e1271-a4de-433f-9316-5f9d2f58fafe；代码基线：6c9a164

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "wx全局覆盖修复",
  "source_extraction_id": "b940121564bd4e05905f263bb6c08f8a",
  "version": 1,
  "memory_type": "entities"
}
-->