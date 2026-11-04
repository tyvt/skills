# Headline recupera expandir e retrair sem showAction false
No zhi2-web-admin (produto 2.0), o componente Headline com :showAction="false" ocultava os botões de expandir e retrair.

## Problema
- Headline com :showAction="false" escondia botões de expandir e retrair
- committeeTable.vue, managementOrgPanel.vue, regulatoryAccountPanel.vue e detail.vue precisavam restaurar o comportamento

## Solução
- Remover :showAction="false" em committeeTable.vue, managementOrgPanel.vue, regulatoryAccountPanel.vue e detail.vue
- Bloco de informações de ativos operacionais mantém v-model="showBenefitTable" expandido por padrão
- buildingTable.vue e propertyContractTable.vue também ajustados

## Verificação e Origem
- Arquivos: publicQuery/complex/detail.vue, publicQuery/complex/components/committeeTable.vue, managementOrgPanel.vue, regulatoryAccountPanel.vue, buildingTable.vue, propertyContractTable.vue, components/Headline/index.vue
- Evidência: src=产品2.0/074.md; sessão 282e21d0-00c8-49c2-89a3-940f0f8e05be; base none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "headline_showaction_remove",
  "source_extraction_id": "0edb7cc648894aa9871156f6c2fe3d68",
  "version": 1,
  "memory_type": "entities"
}
-->