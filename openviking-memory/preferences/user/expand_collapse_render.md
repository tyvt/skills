- 偏好：文本未超过长度时不展示展开/收起按钮，仅在 `processText.length > MAX_DESC_LENGTH` 时显示。
- `construction-manage.vue` 通过 `v-if="shouldShowExpand(item)"` 条件渲染展开/收起按钮；方法 `shouldShowExpand(item)` 判断 `processText.length > MAX_DESC_LENGTH`。
- `displayText` 截断逻辑保持不变（超长时截断，不超长时完整显示）。
- 涉及文件：D:/repository/泰兴小程序/src/pages_maintain_project/construction-manage.vue（@src/pages_maintain_project/construction-manage.vue）。
- 所属项目：泰兴小程序；验证：extracted source=cursor session=dca01c09-e670-4c59-8317-25e2f9529261。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "expand_collapse_render",
  "source_extraction_id": "7f74e274d67f42889c7acf3150450783",
  "version": 2,
  "memory_type": "preferences"
}
-->