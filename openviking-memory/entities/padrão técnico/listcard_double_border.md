# Borda dupla e linha horizontal por list-card repetido
Padrão técnico para páginas de publicidade que envolvem list-card externo causando borda dupla.
## Causa raiz
- pubownerDecision/index.vue e pubPublicity/index.vue repetem list-container+list-card fora do subcomponente que já tem ListTemplate.
- Subtabela .sub-container sem estilo padrão causa linha horizontal inferior.
## Solução
- Remover invólucro externo e renderizar subcomponente diretamente.
- index.scss adiciona estilo .sub-container consistente com .list-card.
## Arquivos e verificação
- Arquivos: pubownerDecision/index.vue, pubPublicity/index.vue, pubQuarterlyDeclaration/index.vue, detailTable.vue, autonomy/general/index.vue, autonomy/publicity/index.vue, styles/index.scss, mixins/ListTemplate.js.
- Sessão de origem: 37a43ff8-4058-4152-bac5-a0c1e5aa7270; linha de base: none.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "listcard_double_border",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->