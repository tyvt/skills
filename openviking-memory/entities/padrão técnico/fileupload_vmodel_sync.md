# Sincronização v-model antes de emitir getList no FileUpload
No projeto 苏州市房地产监测V3, o `FileUpload` emitia `getList` antes de sincronizar `v-model`, fazendo `validateField` errar por `form.certificateFile` vazio; corrigido em `handleUploadSuccess`.

## Descrição
- Erro de validação de campo vazio em diálogos de certificado de funcionário
- Causa: ordem de `handleUploadSuccess` emitindo antes de sincronizar

## Solução
- Em `FileUpload/index.vue`, `handleUploadSuccess` chama `handleFileListChanged()` para sincronizar `v-model` antes de `$emit('getList')`
- Afetou dois `certificatesDialog.vue` em `staffManagement`

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/232.md
- Arquivos: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/FileUpload/index.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/personnelRecord/certificatesDialog.vue
- Sessão de origem: 6ae031ba-01c4-4fb7-b554-8fab64e1aa45; linha de base: none


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "fileupload_vmodel_sync",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 1,
  "memory_type": "entities"
}
-->