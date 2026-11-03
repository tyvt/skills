# Depuração de iframe de menu de nomes de lugares
No projeto 苏州市房地产监测V3, o menu de nomes de lugares via iframe apresenta carregamento anômalo; foram excluídas quatro causas comuns.

## Causas excluídas
- Formato de URL inválido
- Token admin inválido
- Interceptação por X-Frame-Options (nginx 9996 sem esse header)
- Interceptação por localStorage cross-origin

## Próximos passos
- Ainda é necessário inspecionar F12 Console, iframe src e Network status code para localizar a causa raiz.

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3/057.md
- Arquivos: src/views/IframePage/index.vue; src/utils/placeDmsp.js; src/views/placeApproval/index.vue; src/views/InnerLink/index.vue; src/layout/index.vue; src/utils/auth.js; .pi-tmp-iframe-probe.mjs; .pi-tmp-xorigin.mjs
- Projeto: 苏州市房地产监测V3; sessão: 01a166fb-f5cc-764e-99b7-41f862b396d5

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "iframe_place_menu_debug",
  "source_extraction_id": "286d4a02568d45098deccb6676a841bb",
  "version": 1,
  "memory_type": "entities"
}
-->