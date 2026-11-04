- Em AgreementDetailsDialog.vue e SupervisionAddDialog.vue, usar DetailTemplate para exibir campos no modo de visualização; manter zs-form no modo de edição.
- Em onClose, chamar resetFields apenas quando o ref do formulário existir, para evitar erro no modo de visualização.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Padrão de formulário em diálogos de supervisão",
  "source_extraction_id": "19524133521643418bfe9ac26320305a",
  "version": 1,
  "memory_type": "preferences"
}
-->