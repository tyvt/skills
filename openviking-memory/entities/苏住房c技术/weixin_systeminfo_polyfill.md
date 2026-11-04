# 微信拆分系统信息API需polyfill兼容
苏住房C（uni-app mp-weixin）微信小程序基础库拆分 wx.getSystemInfoSync，需新增 polyfill 重定向旧调用避免弃用警告。

## 问题现象
- 微信小程序基础库拆分 `wx.getSystemInfoSync`，`src/utils/system-info.js` 回退逻辑与 `vendor.js` 内部调用触发弃用警告
- 直接切换新 API 后第三方 vendor 等旧调用点仍引用旧接口产生告警

## 解决方案
- 更新 `src/utils/system-info.js`：微信端改用 `wx.getWindowInfo()` 等新 API，移除旧回退逻辑
- 新增 `src/polyfills/mp-weixin-system-info.js` 重定向旧调用到新实现
- `main.ts` 首行引入该 polyfill 确保优先执行

## 验证与归属
- 验证证据：苏住房C/055.md
- 涉及文件：package.json、src/components/ZsNav/ZsNav.vue、src/utils/index.js、src/utils/system-info.js、src/components/StatusBar/StatusBar.vue、src/pages_my/robot/index.vue、src/components/shared/SignBoard.vue、src/pages_owner/elevator/index.vue、src/polyfills/mp-weixin-system-info.js、main.ts
- 所属项目：苏住房C；来源会话ID：970c1102-ef4a-4650-b2b0-7044abd68b9e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "weixin_systeminfo_polyfill",
  "source_extraction_id": "e6e8e38071404e3ba2e177022db337ec",
  "version": 1,
  "memory_type": "entities"
}
-->