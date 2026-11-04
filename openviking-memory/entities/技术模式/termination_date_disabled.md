# Campo de data de rescisão desabilitado e sem valor em detalhe de conta
No projeto 淮安物管 (zhi2-web-admin), pubRegulatoryAccount/detail.vue tem zs-input de data de rescisão com disabled fixo, impossível editar.

## Problema
- zs-input de terminationDate está hardcoded disabled em todos os modos
- Em visualização/edição vem de getPubRegulatoryAccount; em novo, form.terminationDate inicia undefined sem lógica de atribuição

## Impacto
- Usuário não pode definir ou alterar data de rescisão

## Arquivos e verificação
- Sessão cursor 75ba0721-e96d-4590-bbf7-51d468632dec
- 涉及文件: src/views/benefit/pubRegulatoryAccount/detail.vue, components/PubManagementTable.vue, pubManagementOrg/detail.vue, api/benefit/pubRegulatoryAccount.js, pubRegulatoryAgreement/detail.vue, pubRegAccountChange/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "termination_date_disabled",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->