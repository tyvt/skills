# 平台配置接口下发主题色
园区物管2.0 中主题色由平台配置接口下发，通过 getPlatformConfig 后调 changeThemeColor 动态生成 CSS 变量，避免色值写死。

## 问题背景
- 后台需支持每个项目/平台主题色不同，主色不能写死
- 主题色非前端常量，由 getPlatformConfig 接口下发，页面加载晚于样式初始化

## 解决方案
- store/modules/app.js 的 getPlatformConfig 拿到 res.data 后 commit('SET_PLATFORM_CONFIG')
- 读 platformConfig.buttonDefaultColor，有值则调用 utils 的 changeThemeColor(primaryColor) 动态设置 --primary-color 及浅/深衍生变量
- 必须做空值保护，接口未返回主题色时不能报错
- 后续 buttonWarningColor/buttonTextColor 等按同一模式接入对应 CSS 变量
- 新增主题相关样式一律消费这些 CSS 变量，不写死色值

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 5a11ca4b 中 app.js getPlatformConfig 接入 changeThemeColor，按 buttonDefaultColor 动态设置 --primary-color 及浅/深变量并做空值保护
- 涉及文件：zhi2-web-admin/src/store/modules/app.js、zhi2-web-admin/src/api/index.js
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：5a11ca4b-0f0d-4cb0-b4f1-e9e574a65811

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_config_theme",
  "source_extraction_id": "8c9ff18cd576499fa45b34aa0decf72e",
  "version": 1,
  "memory_type": "entities"
}
-->