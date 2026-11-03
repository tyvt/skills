# Bug: Subtabela Some ao Trocar Revisão por Edição
No projeto 苏州市房地产监测V3, ao alternar de modo visualização para edição em limitação de imóveis, a subtabela desaparece por dados não preenchidos.

## Causa
- Modo visualização usa `houseLimitLineData`; modo edição usa `selectedHouses`.
- Ao trocar, `selectedHouses` fica vazio e API não retorna `houseList`, causando sumiço.

## Solução
- `limitFormMixin.js` adiciona `hydrateSelectedHousesForEdit()` para preencher por prioridade e extrai métodos auxiliares para desacoplar.

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/128.md
- Arquivos: limitFormMixin.js, limitCancel.vue, limitAdd.vue, detailMixins.js, main.js, house-limit-helpers.js, house-limit-list-detail.spec.js, .workbuddy/memory/2026-09-23.md
- Sessão: de78bf5d-ff1d-4c2d-b6b5-2faf54f81d39; Base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão Técnico",
  "name": "limit_subtable_fix",
  "source_extraction_id": "9a72ed1246ed49b9a2c86e9dac3adbdd",
  "version": 1,
  "memory_type": "entities"
}
-->