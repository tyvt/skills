# Caminho incorreto e falta de registro de AppendixEmpty
No projeto 苏州市房地产监测V3, `AppendixEmpty` está em `src/components/AppendixEmpty/index.vue`, mas arquivos o referenciam de modo errado causando erro Vite.

## 问题根因
- `AppendixEmpty` realmente localizado em `src/components/AppendixEmpty/index.vue`
- `conLandLic/detail.vue` e `conLandLic/changeDetail.vue` importam `@/components/AnnexUpload/components/AppendixEmpty.vue` inexistente
- `AppendixPackageSection/index.vue` usa `AppendixEmpty` no template sem registrá-lo, gerando erro Vite

## 解决方案
- Alterar referências nos dois arquivos para `@/components/AppendixEmpty/index.vue` (alinhado com `presale/surveyChange/detail.vue`)
- Em `AppendixPackageSection/index.vue` adicionar import e registro do componente `AppendixEmpty`

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/067.md
- 涉及文件: conLandLic/detail.vue, conLandLic/changeDetail.vue, AppendixPackageSection/index.vue, presale/surveyChange/detail.vue, AppendixEmpty/index.vue, presale/permitCancel/detail.vue, companyAdmin/detail.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 3e018025-42b0-4579-8189-908990fe5d69; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_empty_fix",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->