# Regressão de árvore de departamento B/G
Na 2.6.1 a lógica era `terminalType != 'B'`, ocultando a árvore de departamento no B. Na 2.6.2 (task490) mudou para `isGTerminalLike`/`isBTerminalPractitioner`, causando que o admin empresarial B ainda visse árvore de departamento vazia — regressão.

## Contexto
- 2.6.1: `terminalType != 'B'` ocultava árvore no lado B
- 2.6.2 (task490): condição alterada quebrou o comportamento do B

## Fatos
- Admin empresarial B continuou vendo árvore de departamento vazia após task490
- Condição `isGTerminalLike`/`isBTerminalPractitioner` introduziu regressão

## Verificação e Origem
- Arquivos: property/complex/components/RegionTreeLayout.vue, benefit/housePart/index.vue, utils/terminalUser.js, mixins/table.js, mixins/listMixins.js, property/complex/components/regionTree.vue, property/serviceItem/index.vue, store/modules/user.js
- Projeto: 产品2.0; Fonte: 036.md; Sessão: 33328664-0183-4781-807e-7e1586e6d95d

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "bg_dept_regress",
  "source_extraction_id": "48b19525c64140a5b949b1bdad141457",
  "version": 1,
  "memory_type": "entities"
}
-->