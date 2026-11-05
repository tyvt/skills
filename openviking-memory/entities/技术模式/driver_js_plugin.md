# driver.js 新手引导插件
zhi2-web-admin 封装 driver.js 实现进入非首页时的自动新手引导。

## 实现要点
- 新建 `zhi2-web-admin/src/plugins/driver.js`：引入 driver.js 及其样式，创建单例 Driver 实例并挂载到 `app.config.globalProperties.$driver`
- 对外提供 `defineSteps(steps)`（内部调用 0.x 的 `setSteps`）与 `start(stepIndex)`（内部调用 `driver.start`）
- 若 `steps` 非数组或为空，`defineSteps` 直接 return 不报错
- `main.js` 中 `import driverPlugin` 并在 `applyGlobalConfig` 里 `app.use(driverPlugin)`
- `App.vue` 的 `start()` 保留对 `this.$driver` 的判断，避免未挂载时报错

## 使用方式
- 进入非「首页」且满足条件下，延迟约 2 秒自动跑引导（列表页用 `DriverList`，带 `:t...` 原文截断）

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 来源会话：a521eb39-d368-4ec1-a02a-4131c89c94c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "driver_js_plugin",
  "source_extraction_id": "8a9af5502aec47c3be80b7a1a22b0f05",
  "version": 1,
  "memory_type": "entities"
}
-->