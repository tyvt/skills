# Summary
用户将微信小程序弃用 API wx.getSystemInfoSync 替换为 wx.getWindowInfo 等新接口，新增 utils/system-info.js 工具，替换业务代码12处调用。所属项目苏住房C。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】fact
【标题】vendor.js?t=wechat&s=17872
【内容】这是微信小程序对 `wx.getSystemInfoSync` 的弃用提示。我已在业务代码里统一改为新 API。 ## 原因 微信已弃用 `wx.getSystemInfoSync`，建议改用： - `wx.getWindowInfo()` — 窗口宽高、`statusBarHeight`、`safeArea` 等 - `wx.getDeviceInfo()` / `wx.getAppBaseInfo()` — 设备与应用信息 ## 已做修改 1. **新增工具** `zhi2-mobile-shimin/src/utils/system-info.js` - `getWindowInfo()`：小程序优先走 `wx.getWindowInfo()` - `getSystemInfo()`：兼容原 `uni.getSystemInfo` 回调写法 2. **替换业务中的旧调用**（共 12 处）： - `App.vue`（删除未使用的调用） - `StatusBar.vue`、`ZsNav.vue` - `companyCredit`、`dishonestyCredit` - `Home_Suzhufang`、`MidModuleGrid`、`Project_Suzhufang` - `SignBoard`、`robot`、`automaticRobot`、`elevator` #
【验证证据】extracted source=cursor project=苏住房C
【涉及文件】`zhi2-mobile-shimin/src/utils/system-info.js ; `App.vue ; `StatusBar.vue`、`ZsNav.vue ; `vendor.js
【所属项目】苏住房C
【来源会话ID】38194afa-6f69-47b8-afec-2cec1a1ae8ae
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "系统信息API替换",
  "goal": "替换弃用系统API",
  "summary": "用户将微信小程序弃用 API wx.getSystemInfoSync 替换为 wx.getWindowInfo 等新接口，新增 utils/system-info.js 工具，替换业务代码12处调用。所属项目苏住房C。",
  "ranges": "21-27",
  "source_extraction_id": "c33449cae140464d8fcd5af031321f74",
  "version": 1,
  "memory_type": "events"
}
-->