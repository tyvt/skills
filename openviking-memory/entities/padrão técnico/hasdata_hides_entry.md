# Entrada de registro oculta por v-if com dados
Vários subcomponentes usam `v-if="!hasData"` para controlar a entrada de registro no canto superior direito, ocultando-a quando há dados.

## Causa raiz
- Múltiplos subcomponentes usam `v-if="!hasData"` para controlar a entrada de registro; com dados, a entrada fica oculta.

## Solução
- `propertyContractTable.vue`, `managementOrgPanel.vue`, `regulatoryAccountPanel.vue`: remover a condição para a entrada ficar sempre visível.
- `committeeTable.vue`: entrada sempre visível e remover `checkCommitteeDataFlags`.
- `detail.vue`: se faltar o botão de registro de ativos operacionais, verificar `showBenefitService` false; lógica de prompt em tabela vazia inalterada.

## Arquivos envolvidos
- d:/repository/产品2.0/zhi2-web-admin/src/views/publicQuery/complex/detail.vue
- propertyContractTable.vue, committeeTable.vue, managementOrgPanel.vue, regulatoryAccountPanel.vue, advertiseTable.vue, overviewSubTableTemplate.js

## Validação e origem
- Evidência: src=产品2.0/071.md; Sessão: 35553223-dace-4e9a-b3e2-6d7267b933f7; Projeto: 产品2.0 (zhi2-web-admin)

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "hasdata_hides_entry",
  "source_extraction_id": "b8a6385471564bb19b6b65b0e5a5a7ee",
  "version": 1,
  "memory_type": "entities"
}
-->