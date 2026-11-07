# getSystemInfoSync 弃用 polyfill
苏住房C 开发者工具反复警告 wx.getSystemInfoSync is deprecated，需靠 main.ts 首行 polyfill 重定向，仅改业务代码无效。

## 问题根因
- 警告来自 vendor.js:1438，uni-app 运行时 vendor.js 内部也调用 getSystemInfoSync，改业务代码触达不到框架侧调用
- 业务侧 src/utils/system-info.js 回退分支仍调 uni.getSystemInfoSync()，两层原因只治一层无效

## 解决方案
- 重写 utils/system-info.js：小程序端改用 wx.getWindowInfo()/wx.getDeviceInfo()/wx.getAppBaseInfo() 组合取尺寸设备信息，删掉 uni.getSystemInfoSync 回退；H5 用 window 尺寸兜底
- 新增 src/polyfills/mp-weixin-system-info.js，最早时机把 wx/uni 的 getSystemInfoSync、getSystemInfo 重定向为新 API 合并结果（兼容 screenWidth/windowWidth/windowHeight/pixelRatio/statusBarHeight/SDKVersion 等字段）
- 在 main.ts 首行引入该 polyfill，必须早于框架代码执行
- 残留警告多为第三方库（z-paging、@dcloudio/uni-ui）在 polyfill 前调用旧 API 或 @dcloudio/uni-app 版本偏旧，可考虑升级

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 970c1102，基线 4630e8e；警告来自 vendor.js:1438，解法如上
- 涉及文件：src/utils/system-info.js、src/polyfills/mp-weixin-system-info.js、src/components/ZsNav/ZsNav.vue、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：970c1102-ef4a-4650-b2b0-7044abd68b9e；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "systeminfo_sync_polyfill",
  "source_extraction_id": "f684d63a5e0143f29d14a1b71d05f06a",
  "version": 1,
  "memory_type": "entities"
}
-->