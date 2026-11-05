- 在 `benefit/alert` 等页面中，使用 mixin 默认的 `getList()`，不要向它传参；查询按钮先切换预警类型再调用无参 `getList()`。
- 删除页面自定义 `getList` 覆盖实现，通过 `moduleName: 'benefit'`、`businessName: 'warningAnalys'` 等 mixin 配置驱动，而非传入参数。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "mixin getList 调用方式",
  "source_extraction_id": "8bbb42a345f6475a9e716b0444aa32ed",
  "version": 1,
  "memory_type": "preferences"
}
-->