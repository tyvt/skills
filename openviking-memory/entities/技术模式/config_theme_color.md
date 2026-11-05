# 园区物管2.0 平台配置自动应用主题色
园区物管2.0 在 `zhi2-web-admin/src/store/modules/app.js` 中接入平台配置返回后自动生成主题色变量。

## 功能说明
- 接口返回平台配置后自动调用主题色变量生成方法，动态设置 CSS 变量

## 实现方式
- 新增引入 `changeThemeColor`（来自 `@/utils/index`）
- 在 `getPlatformConfig` 拿到 `res.data` 后先 `commit('SET_PLATFORM_CONFIG', platformConfig)`
- 读取 `platformConfig.buttonDefaultColor`，有值则调用 `changeThemeColor(primaryColor)`
- 动态设置 `--primary-color` 及其浅/深色变量
- 增加空值保护，避免接口未返回主题色时报错

## 验证与归属
- 涉及文件：zhi2-web-admin/src/store/modules/app.js、zhi2-web-admin/src/api/index.js
- 所属项目：园区物管2.0；来源会话：5a11ca4b-0f0d-4cb0-b4f1-e9e574a65811
- 已通过该文件 lint 检查

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "config_theme_color",
  "source_extraction_id": "e290f9ca93584316ad96adb46810389a",
  "version": 1,
  "memory_type": "entities"
}
-->