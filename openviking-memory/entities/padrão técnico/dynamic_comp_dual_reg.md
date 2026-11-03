# Componente dinâmico minúsculo comp não duplamente registrado causa Unknown
No projeto 苏州市房地产监测V3, a página de contrato pré-venda usa `comp` minúsculo em `data.js` como componente dinâmico, mas `loadComponents` registra apenas pelo `name` PascalCase do SFC, gerando `Unknown custom element`.

## Causa raiz
- `data.js` da página de contrato pré-venda usa `comp` minúsculo como nome de componente dinâmico
- `loadComponents` registra apenas pelo `name` PascalCase do SFC
- Capítulos não reconhecidos, erro `Unknown custom element`

## Correção
- Em `src/views/contract/index.vue` usar `require.context` e registrar duplamente pelo nome do arquivo e `ctrl.name`

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/111.md
- Arquivos: contractContent.vue, contract/index.vue, pre/data.js, stock/contract/detail.vue, pre/cover.vue, vite.config.js, main.js, index.html
- Projeto: 苏州市房地产监测V3; sessão: b0e0e476-6db0-4fd6-be74-9dfdfcfeb066; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "dynamic_comp_dual_reg",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->