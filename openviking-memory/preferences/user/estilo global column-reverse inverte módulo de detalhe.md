- O estilo global `index.scss:265` define `flex-direction: column-reverse` para posicionar o grupo de botões no topo; em `autonomy/general/detail.vue`, quando `bizState=='2'`, dois `el-row` irmãos são invertidos, fazendo as informações básicas descerem ao final.
- Correção aplicada: ajustar a estrutura do template em `detail.vue` para evitar o efeito colateral da inversão.
- Arquivos envolvidos: zhi2-web-admin/src/views/autonomy/general/detail.vue, src/styles/index.scss, autonomy/general/components/DecisionRangeTable.vue, components/Headline/index.vue, mixins/detailMixins.js, indemnity/leaseOverview/index.vue, autonomy/option/detail.vue, components/OperationBtnGroup/index.vue
- Evidência: session=workbuddy 4e97a820-f6c5-43ad-913d-4d6436b2148e

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "estilo global column-reverse inverte módulo de detalhe",
  "source_extraction_id": "bd4b0a8c2e31430396eca479ecc7d5f4",
  "version": 1,
  "memory_type": "preferences"
}
-->