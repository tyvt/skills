# Bloqueio de edição de detalhes de pessoal de agência
Sistema Suzhou Real Estate Monitoring V3: AgencyPersonnelDetail.vue teve lógica de edição do G-terminal removida, restrincando entrada a terminal empresarial e estado pendente.

## Pontos de implementação
- Removido `:allow-edit-when-recorded='isGTerminal'`; `canEditInHeader` passou a ser apenas terminal B com `bizState==='0'`
- Removida lista branca e lógica especial do G-terminal em AgencyPersonnelBasicInfoFormFields.vue, unificando avisos de estado de registro
- Envolve AgencyPersonnelList.vue e testes e2e de fluxo

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-rest/037.md
- Arquivos: AgencyPersonnelDetail.vue, AgencyPersonnelBasicInfoFormFields.vue, AgencyPersonnelList.vue, e2e/institution/agency-personnel-real-api-flow.spec.js
- Projeto: Suzhou Real Estate Monitoring V3; Sessão: 01a1631d-9a15-70c5-a400-7668d0d29bb4; Base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "agency_personnel_edit",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "entities"
}
-->