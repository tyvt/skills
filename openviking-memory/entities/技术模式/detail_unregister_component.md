# Defeito de Componente Registrado mas Não Utilizado no Detail.vue
No projeto Suzhou Real Estate Monitoring V3, companyAdmin/detail.vue registrou RegisterUploadItem em components sem importá-lo, e o template não o usava, causando erro de referência.

## 问题根因
- companyAdmin/detail.vue registrou RegisterUploadItem em components sem import
- Template não usava o componente, registro redundante causava erro de referência

## Correção
- Removeu-se o registro redundante de RegisterUploadItem
- Upload necessário passou a ser tratado por AppendixPackageSection para restaurar rota

## Verificação
- 验证证据: src=苏州市房地产监测V3-rest/023.md
- 涉及文件: companyAdmin/detail.vue, agency/detail.vue, certLic/consLic/detail.vue, register-form.scss, zs-select-dialog.vue, DeveloperBasicInfoDetail.vue, index.scss, companyAdmin/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; sessão: 0cdbc4de-abdb-4fc7-8b12-467375ea1019; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "detail_unregister_component",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 4,
  "memory_type": "entities"
}
-->