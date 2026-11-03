- `src/staff/components/PageButton/PageButton.vue` 的 `getBtnStyle` 需同步写入 CSS 变量 `--btn-bg-color`、`--btn-color`、`--btn-border-color`。
- 新增 `.btn-custom` 以 `!important` 强制应用并清除 `::after` 伪元素边框。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "PageButton自定义色CSS变量强覆盖",
  "source_extraction_id": "b7c019530c904296840e1259d4506eac",
  "version": 1,
  "memory_type": "preferences"
}
-->