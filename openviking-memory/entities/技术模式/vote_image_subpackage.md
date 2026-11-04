# Owner Vote List Image Subpackage
Imagens estáticas de miniprograma não podem ser acessadas entre subpacotes, causando falha na exibição de house_szf.png.

## Problema e correção
- Imagens estáticas de subpacote não podem ser acessadas entre pacotes, deixando house_szf.png invisível na lista de votação
- Imagem copiada para src/pages_vote/static/images/
- DecisionList.vue e StepChoose.vue especificam explicitamente o subpacote pages_vote
- utils/index.js atualiza prioridade de mapeamento de subpacotes

## Arquivos envolvidos
- src/pages.json, src/utils/index.js
- src/pages_owner/decision/index.vue, components/DecisionList.vue
- src/store/menu.js
- src/pages_vote/decision/index.vue, components/DecisionList.vue, src/pages_vote/elect/index.vue

## Origem
- Sessão de origem: 5a891058-8e80-44d0-9a37-a7ff9e578ff9
- 所属项目: zhi2-mobile-shimin

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_image_subpackage",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "entities"
}
-->