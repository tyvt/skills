- 在 `permitConstants.js` 中，添加 `PLAN_DICT_TYPES` 和 `resolveDictLabel()`；`plan/detail.vue` 在 `created()` 中通过 `getDicts` 调用 `initDict()`。
- 土地使用类型、地块用途以及是否有委托改为绑定到 `Options` 的 `zs-select`，移除硬编码的 1/2 选项。
- 验证证据: `苏州市房地产监测V3-rest/035.md`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 在预售计划中使用带字典的 zs-select",
  "source_extraction_id": "f95f644aa4cd4dae810385ea25b18d7d",
  "version": 1,
  "memory_type": "preferences"
}
-->
