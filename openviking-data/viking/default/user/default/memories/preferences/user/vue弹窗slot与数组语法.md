- 弹窗构建失败时优先将 `<zs-select-dialog>` 的 `slot="columns"` 写法重构为 `SelectDialog.open()` + `columns` 配置。
- 修正 Vue 文件中的数组语法错误，如 `"options": this.[...]` 这类错误写法需改为正确数组字面量。
- 旧 `slot="footer"` 写法需调整为新模板语法。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue弹窗slot与数组语法",
  "source_extraction_id": "7032ac70bed64e608e89ffd58925af98",
  "version": 1,
  "memory_type": "preferences"
}
-->