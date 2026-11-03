
# 苏服办微信拨号降级方案
苏住房C 在苏服办生态拨号需「SDK 优先 + tel: 协议降级」双通道，否则微信内必失败。
## 问题根因
- 苏服办 App 走 jmportal.communication.callPhone 可用；微信环境走 lightAppJssdk.device.call 依赖 wx.miniProgram.navigateTo
- 页面不在苏服办小程序 webview 时 window.wx.miniProgram 不存在，SDK 同步抛错且无降级，表现为点电话报错或无反应
## 解决方案
- 封装统一拨号函数：先动态加载 jweixin 并等待就绪，尝试苏服办 SDK；不可用或抛错时自动降级为 tel: 协议拨号
- 调用点外层包 try-catch 捕获 navigateTo 同步异常避免整页崩溃；苏服办 App 内只走官方 SDK 不加降级分支
- 排查先问清「微信内置浏览器」还是「某小程序 webview」，两者限制不同；改完必须重新构建部署，dev 热更新看不到效果
## 验证与归属
- 涉及文件：src/utils/sfb.js、src/pages/policy/fddydetail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 11c71496；代码基线 77666f8


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_callphone_fallback",
  "source_extraction_id": "5e371535e51540189614394318a97e79",
  "version": 1,
  "memory_type": "entities"
}
-->