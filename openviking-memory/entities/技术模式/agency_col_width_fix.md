# Correção de largura fixa da coluna de operação na lista de funcionários
No projeto 苏州市房地产监测V3, a coluna de operação da lista de funcionários de agência teve a largura fixa removida para reduzir espaço em branco.

## Problema
- zs-operate-column com :width="480" causava excesso de espaço em branco na lista AgencyPersonnelList.vue

## 解决方案
- Removido :width="480" de zs-operate-column em AgencyPersonnelList.vue
- Largura calculada automaticamente pelo componente conforme texto dos botões
- Largura reduzida em 164px com botões dispostos sem quebra de linha

## Verificação e arquivos
- Verificação: src=苏州市房地产监测V3/179.md
- 涉及文件: AgencyPersonnelList.vue, zs-operate-column.vue, package.json, agency-personnel-real-api-flow.spec.js, vite.config.js, institution-menu-config.js, institution-helpers.js, auth-helpers.js
- Sessão: c07f2835-00f4-4f26-8f40-499ded465259

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_col_width_fix",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 1,
  "memory_type": "entities"
}
-->