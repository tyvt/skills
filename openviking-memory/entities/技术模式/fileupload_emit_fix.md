# Correção de ordem emit e v-model em FileUpload
No projeto 苏州市房地产监测V3, `handleUploadSuccess` de `FileUpload/index.vue` emitia `getList` antes de sincronizar `v-model`, causando erro de campo vazio em `validateField`.

## 描述
- Componente FileUpload e diálogos de certificados afetados
- 所属项目: 苏州市房地产监测V3

## 问题根因
- Ordem original: primeiro `$emit('getList')` depois sincronização `v-model`
- Isso fazia `form.certificateFile` vazio ao `validateField`, disparando «não pode ser vazio»

## 解决方案
- Ajustado para primeiro `handleFileListChanged()` sincronizando `v-model`, depois `$emit('getList')`
- Arquivos relacionados: `certificatesDialog.vue` em staffManagement e personnelRecord

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/032.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/FileUpload/index.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/personnelRecord/certificatesDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/package.json; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/company/personnel-record.spec.js
- Sessão de origem: 6ae031ba-01c4-4fb7-b554-8fab64e1aa45; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fileupload_emit_fix",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->