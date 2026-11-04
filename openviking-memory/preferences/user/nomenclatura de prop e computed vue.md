- 避免在 OperationBtnGroup 中将 'businessName' 定义为 prop 同时作为计算属性，因为这会触发 Vue 的警告；使用新的计算属性 'effectivePermissionPrefix' 提供给按钮 :permission 以避免冲突。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Nomenclatura de prop e computed Vue",
  "source_extraction_id": "19524133521643418bfe9ac26320305a",
  "version": 1,
  "memory_type": "preferences"
}
-->