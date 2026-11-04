# Unificação de espaçamento com tokens na página de detalhe
No projeto zhi2-web-admin (苏州市房地产监测V3), substituiu-se o valor fixo de 24px por tokens de espaçamento.

## Alterações
- `variables.css` adiciona tokens como `--detail-page-padding`
- `index.scss` e `Headline/index.vue` substituem o hardcoded 24px
- Remove borda duplicada e margin sobreposto de `DetailTemplate` dentro de `Headline`

## Arquivos envolvidos
- src/styles/index.scss
- src/components/Headline/index.vue
- src/views/projectManagement/customerProject/detail.vue
- src/components/detail-template/detail-template.vue
- src/layout/components/AppMain.vue
- src/mixins/detailMixins.js
- src/main.js
- src/views/projectManagement/buildinginfo/detail.vue

## Verificação
- Sessão cursor: 280dea0c-9d8d-46bc-8e8f-9208741e4322

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_token_spacing",
  "source_extraction_id": "a4c1b4b28e954766b9f8128b10303b6f",
  "version": 1,
  "memory_type": "entities"
}
-->