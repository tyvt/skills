# uni-datetime-picker causa espaço em branco abaixo da data
No app móvel de gestão imobiliária B-end, o uni-datetime-picker causava espaço em branco abaixo do seletor de data em record/add.vue; corrigido estendendo ZsDatePicker e removendo estilos de correção.

## Causa raiz
- O uni-datetime-picker em src/pages_facility/record/add.vue causa espaço em branco abaixo do seletor de data de inspeção

## Solução
- Estendido ZsDatePicker para suportar type="date" substituindo o componente original
- Removidos onDateChange e o estilo de correção :deep(.uni-calendar__content-mobile)

## Verificação e atribuição
- Evidência: extracted source=cursor session=348a159a-0e6d-49a3-a318-5c1a3d19e32b
- Arquivos: src/pages_facility/record/add.vue, src/pages_facility/record/addScrap.vue, src/components/ZsDatePicker/ZsDatePicker.vue, src/pages_facility/components/FilterPopup.vue, src/components/ZsPicker/ZsPicker.vue, src/pages_facility/record/index.vue, src/styles/filter.scss
- Sessão de origem: 348a159a-0e6d-49a3-a318-5c1a3d19e32b; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "datetime_picker_gap",
  "source_extraction_id": "926ca69557244270b1d93c4505f97348",
  "version": 1,
  "memory_type": "entities"
}
-->