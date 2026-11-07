- 倾向于从 `permitExtend` 和 `permitCancel` 获取 `busCode`，通过从 `route.meta.busCode` 和 `filePath` 解析，并回退到菜单（例如：`presale/permitExtend/index`），而不是硬编码在 `permitExtendConstants.js`/`permitCancelConstants.js` 中。
- `detail.vue` 使用 `resolveExtendAppendixBusCode`/`resolveCancelAppendixBusCode` 来进行该解析。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 通过菜单的 busCode 代码",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 1,
  "memory_type": "preferences"
}
-->
