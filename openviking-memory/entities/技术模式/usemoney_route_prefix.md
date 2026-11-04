# Prefixo de Tipo Ausente no Salto de Detalhe de Uso de Fundos

No projeto 苏州市房地产监测V3, a navegação de detalhe de uso de fundos pulava para página não supervisionada por falta de prefixo de tipo.

## 问题根因
- `resolveListRoutePathHint` captura apenas o último segmento `usemoney`, fazendo `pickDetailRouteForList` casar errado com a rota não supervisionada `general/usemoney/:tableid`.
- `buildTableIdNavigation` prioriza esse caminho incorreto de correspondência.

## Correção
- Em `zhi2-web-admin/src/utils/ruoyi.js`, os três pathHints de uso de fundos passam a ser `general/usemoney`, `special/usemoney`, `emphasis/usemoney` para distinguir as rotas.

## Arquivos Envolvidos
- `src/views/supervision/unblock/usemoney/index.vue`, `guarantee/index.vue`, `bond/index.vue`, `usemoney/detail.vue`
- `src/mixins/listMixins.js`, `src/mixins/detailMixins.js`
- `src/utils/ruoyi.js`
- `路由信息.json`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/187.md
- Sessão de origem: 41805f07-b6a7-46c0-90b9-f28d770d61ab
- 所属项目: 苏州市房地产监测V3; baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usemoney_route_prefix",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 1,
  "memory_type": "entities"
}
-->