# Menu do centro de negócios da página inicial renderizado por configuração de interface
No portal, o menu do centro de negócios é renderizado totalmente conforme configuração da API.

## Comportamento
- `homeDataMixin.js` `fetchFunctions` mapeia diretamente `data.businessCenters` para renderizar seções
- Remove override forçado `mergeBusinessFlows` embutido
- `homeLayout.js` `mapFlowsFromApi` adiciona campo `functionIcon` resolvido via `resolveServerAssetUrl`
- Em exceção de interface, fallback para `DEFAULT_BUSINESS_FLOWS`

## Arquivos envolvidos
- `home.js`, `layout/index.vue`, `homeDataMixin.js`, `HomeNavMenu.vue`, `homeLayout.js`, `HomeLayoutAdmin.vue`, `HomeBizSection.vue`, `resolveServerAssetUrl.js`

## 验证与归属
- 验证证据: `src=门户/026.md`
- 所属项目: portal (门户)
- Sessão: `f4b6f504-0c81-40e8-a14a-fc8a60a930be`
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_biz_menu",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "entities"
}
-->