# Upload de cancelamento reutiliza grade unificada de apêndice
No 苏州市房地产监测V3, o upload de materiais de cancelamento de agência substitui `FileUpload` genérico pelo componente unificado `AppendixPackageSection`.

## Objetivo
- Unificar interação de upload e validação de obrigatoriedade no cancelamento
- Reutilizar a grade de apêndice do módulo (grupos de upload com validação)

## Alterações
- `companyCancel/detail.vue` troca `FileUpload` por `AppendixPackageSection` e adapta três estados
- `companyCancel.js` adiciona `COMPANY_CANCEL_APPENDIX_BUS_CODE = 'jgzx'` como fallback
- E2E muda seletor para `.appendix-requirement-grid` e interface para `/file/appendix/upload`

## Escopo
- Envolve também permitCancel/detail.vue, companyApplyAudit/detail.vue, AgencyBranchDetail.vue etc.

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-rest/072.md
- Arquivos: companyCancel/index.vue, detail.vue, README.md, zljg/README.md, AppendixPackageSection/index.vue, permitCancel/detail.vue, companyApplyAudit/detail.vue, AgencyBranchDetail.vue
- Projeto: 苏州市房地产监测V3; Sessão: c91195ed-7ae8-483d-a56e-a2eb8c8b730b; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "cancel_upload_appendix_grid",
  "source_extraction_id": "f3025b0b72ad4d9da2b7a5d18356898a",
  "version": 1,
  "memory_type": "entities"
}
-->