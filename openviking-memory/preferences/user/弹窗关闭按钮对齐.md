- `zs-dialog` botão de fechar usava `top: var(--zs-dialog-padding-y)` com `line-height: 1.5` causando não centralização vertical
- Corrigido em `element-ui.scss` para `top: 50%` + `translateY(-50%)` com `line-height: 1`, e removido `top` incorreto em `zs-dialog.vue`
- 验证证据: src=苏州市房地产监测V3-rest/096.md; 涉及文件: element-ui.scss, zs-dialog.vue, login.vue, OrgTypeDialog.vue, VoteQrcodeDialog.vue, AuditDialog/index.vue, property-register-entry.spec.js, package.json; sessão: 186a234b-b8c5-43be-8142-a0b0c30a7e10

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Alinhamento do botão de fechar diálogo",
  "source_extraction_id": "49cdd093c09f43ab9dcf740eb82cca87",
  "version": 1,
  "memory_type": "preferences"
}
-->