# Problema de desativação total do el-upload em capacidade máxima
No projeto 苏州市房地产监测V3, o `el-upload` desabilitado por completo em capacidade máxima impedia exclusão da lista, e `loadPackage` ao atualizar `:file-list` controlado disparava animação de entrada.

## Causa raiz
- `:disabled="!canUpload"` desabilitava o `el-upload` inteiro em capacidade máxima, causando falha na exclusão de itens da lista
- `loadPackage()` atualizava o `:file-list` controlado, disparando animação de entrada e badge de status

## Correção principal
- Desativação do `el-upload` alterada para `:disabled="!activeConfig || loading"`
- Duração da animação da lista definida como 0 e ocultado `.el-upload-list__item-status-label`

## Verificação e atribuição
- Evidência: src=苏州市房地产监测V3/219.md
- Arquivos: institution/agencyBranch/components/CancelDialog.vue, institution/agencyBranch/components/AppendixPictureUpload.vue, components/AnnexUpload/index.vue, utils/appendix.js, components/AppendixPackageSection/index.vue, components/AnnexUpload/components/AppendixRequirementCard.vue, components/ImageUpload/index.vue, e2e/institution/agency-branch-real-api-flow.spec.js
- Projeto: 苏州市房地产监测V3; Sessão: 01a16795-c57c-764e-99b7-4234d397a95f; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "elupload_disable_bug",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 1,
  "memory_type": "entities"
}
-->