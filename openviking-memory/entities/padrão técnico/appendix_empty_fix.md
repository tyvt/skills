# Caminho incorreto e falta de registro de AppendixEmpty
No projeto 苏州市房地产监测V3, `AppendixEmpty` está em `src/components/AppendixEmpty/index.vue`, mas arquivos o referenciam de modo errado causando erro Vite.

## Causa raiz
- `AppendixEmpty` realmente localizado em `src/components/AppendixEmpty/index.vue`
- `conLandLic/detail.vue` e `conLandLic/changeDetail.vue` importam `@/components/AnnexUpload/components/AppendixEmpty.vue` inexistente
- `AppendixPackageSection/index.vue` usa `AppendixEmpty` no template sem registrá-lo, gerando erro Vite

## Solução
- Alterar referências nos dois arquivos para `@/components/AppendixEmpty/index.vue` (alinhado com `presale/surveyChange/detail.vue`)
- Em `AppendixPackageSection/index.vue` adicionar import e registro do componente `AppendixEmpty`

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/067.md
- Arquivos: conLandLic/detail.vue, conLandLic/changeDetail.vue, AppendixPackageSection/index.vue, presale/surveyChange/detail.vue, AppendixEmpty/index.vue, presale/permitCancel/detail.vue, companyAdmin/detail.vue
- Projeto: 苏州市房地产监测V3; Sessão: 3e018025-42b0-4579-8189-908990fe5d69; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "appendix_empty_fix",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->