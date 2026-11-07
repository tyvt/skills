
- Dialog onClose should guard this.$refs['form'].resetFields() with a ref-existence check, or skip reset when dialogFormMode === 'view', because view mode renders DetailTemplate without a ref='form' zs-form so this.$refs.form is undefined.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dialog_ref_guard",
  "source_extraction_id": "5ce0a0c981c640988963387d2655a557",
  "version": 1,
  "memory_type": "preferences"
}
-->