# Portal Table Title
Título de tabela vazio em página de edifício impedia exibição de cabeçalho.

## 描述
- `PortalTable` renderizava toolbar apenas com `title` ou exportação; `tableTitle` vazio na página de edifício causava ausência de título.
- Títulos unificados: PropertyPages 楼幢→楼幢列表, BrokerPages 经纪人→经纪人列表, RentalPages 企业→企业列表, InformationPages 公告→公告列表.

## Arquivos
- `PortalTable.vue`, `PropertyPages.vue`, `InformationPages.vue`, `BrokerPages.vue`, `RentalPages.vue`, `UnifiedLogin.vue`, `README.md`, `tests/e2e/public-portal-interactions.spec.ts`

## Verificação
- Sessão de origem: `889b9339-9da0-4b8d-a47b-2acdb56919b7`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_table_title",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->