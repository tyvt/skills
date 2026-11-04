
# AppendixEmpty mal referenciado causa erro Vite
`conLandLic/detail.vue` e `changeDetail.vue` importam `@/components/AnnexUpload/components/AppendixEmpty.vue` inexistente (real: `@/components/AppendixEmpty/index.vue`); `AppendixPackageSection/index.vue` não registra `AppendixEmpty`.

## Correção
- Corrigir caminhos de import e registrar `AppendixEmpty` em `AppendixPackageSection/index.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/267.md
- 涉及文件: conLandLic/detail.vue, conLandLic/changeDetail.vue, AppendixPackageSection/index.vue, AppendixEmpty/index.vue, presale/surveyChange/detail.vue, presale/permitCancel/detail.vue, company/companyAdmin/detail.vue
- 所属项目: 苏州市房地产监测V3; sessão: 3e018025-42b0-4579-8189-908990fe5d69; base: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_empty_misref",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 1,
  "memory_type": "entities"
}
-->