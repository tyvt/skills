# driver.js引导封装为插件挂载全局属性
将 driver.js 引导功能封装为插件以规避未挂载时抛 Uncaught 异常。

## 解决方案
- 封装为插件 `src/plugins/driver.js`，创建 driver.js 单例
- 挂载至 `app.config.globalProperties.$driver`
- 在 `main.js` 通过 `app.use` 注册该插件
- `App.vue` 调用前判断 `this.$driver` 是否存在，避免插件未挂载时抛出 `Uncaught` 异常

## 验证与归属
- 验证证据：src=2-0/009.md
- 涉及文件：driver.js、src/plugins/driver.js、main.js、App.vue
- 来源会话：a521eb39-d368-4ec1-a02a-4131c89c94c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "driver_plugin_global",
  "source_extraction_id": "6fe784494645457794d83b09b9193f65",
  "version": 1,
  "memory_type": "entities"
}
-->