# mapGetters ausente na página de registro de preços
No zhi2-web-admin (produto 2.0) a página de registro de preços não tinha mapGetters('common', ['areas']), gerando erro de Vuex getter.
## 问题根因
- Falta de mapGetters('common', ['areas']) no componente recordPriceMngSuzhou.
## 解决方案
- Completar mapGetters('common', ['areas']) na página de registro de preços.
- Validado com a normalização de currentRoute; 69 testes E2E passaram.
## 验证与归属
- 验证证据: cursor session=758460b0-2a05-4d83-8594-0821de46c25c
- 涉及文件: src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue, src/store/modules/permission.js
- 所属项目: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_mapgetters",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->