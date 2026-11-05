# 苏住房C系统信息API弃用告警修复
微信小程序基础库对 wx.getSystemInfoSync 发出弃用警告，已通过业务代码改造与 polyfill 重定向修复。

## 问题根因
- 业务代码 src/utils/system-info.js 回退逻辑仍调用 uni.getSystemInfoSync()
- 框架代码 vendor.js（uni-app 运行时）内部也调用该旧 API 导致控制台告警

## 修复方案
- src/utils/system-info.js：微信小程序改用 wx.getWindowInfo()/wx.getDeviceInfo()/wx.getAppBaseInfo() 等新 API，移除 uni.getSystemInfoSync() 回退，H5 用 window 尺寸作回退
- 新增 src/polyfills/mp-weixin-system-info.js：在启动最早阶段将 wx/uni 的 getSystemInfoSync、getSystemInfo 重定向到新 API 合并结果，拦截 vendor.js 等框架内部旧调用
- main.ts 首行引入 polyfill，确保早于框架代码执行

## 验证与归属
- 所属项目：苏住房C；来源会话：970c1102-ef4a-4650-b2b0-7044abd68b9e
- 涉及文件：src/utils/system-info.js、vendor.js、src/polyfills/mp-weixin-system-info.js、main.ts
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "wx_systeminfo_fix",
  "source_extraction_id": "f36fa3e910da47929bc390966a09b6df",
  "version": 1,
  "memory_type": "entities"
}
-->