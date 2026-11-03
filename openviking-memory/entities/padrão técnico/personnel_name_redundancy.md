
# Filtro de nome redundante em AgencyPersonnelList.vue
No módulo G do projeto 苏州市房地产监测V3, o componente AgencyPersonnelList.vue tinha campos de nome duplicados que foram removidos.

## Problema
- formItems e queryParams configuravam redundantemente «人员姓名» (name) e «从业人员姓名» (keyWord)
- Dois campos de nome criavam ambiguidade no filtro de lista

## Correção
- Removido item de filtro «人员姓名» de formItems e parâmetro name de queryParams
- Adicionado assertion E2E em agency-personnel-real-api-flow.spec.js para garantir apenas tag keyWord

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/178.md
- Arquivos: AgencyPersonnelList.vue, agency-personnel-real-api-flow.spec.js, LeasePersonnelList.vue, AgencyBranchList.vue, index.vue
- Sessão: c1779a4f-3141-425a-bf33-25bd2342d93d; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "personnel_name_redundancy",
  "source_extraction_id": "637076c2ee6643d5b35f55f28e70f356",
  "version": 1,
  "memory_type": "entities"
}
-->