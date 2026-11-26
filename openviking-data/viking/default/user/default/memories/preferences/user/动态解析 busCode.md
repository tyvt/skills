- 在调查变更模块（`surveyChange`）中，`busCode` 应动态地从菜单路由的 `meta` 或 `filePath` 中解析，消除硬编码常量。
- 移除 `surveyChangeConstants.js` 中的常量。
- `detail.vue` 和 `ApprovalDialog.vue` 分别通过计算属性 `surveyChangeBusCode` 和 prop `busCode` 传递 `busCode`。
- 如果菜单未配置 `busCode`，应提示检查配置。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 动态解析 busCode",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "preferences"
}
-->
