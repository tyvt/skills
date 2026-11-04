# mapGetters ausente na página de registro de preços
No zhi2-web-admin (produto 2.0) a página de registro de preços não tinha mapGetters('common', ['areas']), gerando erro de Vuex getter.
## Causa raiz
- Falta de mapGetters('common', ['areas']) no componente recordPriceMngSuzhou.
## Solução
- Completar mapGetters('common', ['areas']) na página de registro de preços.
- Validado com a normalização de currentRoute; 69 testes E2E passaram.
## Verificação e origem
- Evidência: cursor session=758460b0-2a05-4d83-8594-0821de46c25c
- Arquivos: src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue, src/store/modules/permission.js
- Projeto: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "price_filing_mapgetters",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->