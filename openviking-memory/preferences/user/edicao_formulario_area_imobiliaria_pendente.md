- Em zhi2-web-admin/src/views/property/complex/detail.vue, na computed isDisabled, adicionar verificação de bizState antes da role: se formMode for 'add' ou bizState for 0/vazio, retorna false (permite edição).
- Admins G-end e B-end podem editar; profissional B-end bloqueia campos-chave após vínculo.
- 验证证据: src=苏住房G/066.md; 涉及文件: detail.vue, bTerminalProjectMixin.js, detailMixins.js, getters.js, form.js, index.vue, terminalUser.js, OperationBtnGroup/index.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Edição formulário área imobiliária pendente",
  "source_extraction_id": "9afaba5dc1ac4c14af44db9460e5cd8b",
  "version": 1,
  "memory_type": "preferences"
}
-->