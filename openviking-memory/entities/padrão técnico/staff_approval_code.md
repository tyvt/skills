# Vincular código de aprovação no arquivamento de funcionários
O `detail.vue` do lado empresarial alinha com a implementação toB, vinculando os códigos de negócio de aprovação `cyryba`/`cyrybg` ao `:bus-code` do `operation-btn-group`, controlando botões por `formMode` e `businessStatus`, e integrando gaveta `ApprovalProcess` e carregamento de ordem de alteração.

## Contexto
- O arquivamento de profissionais (从业人员备案) precisa alinhar com a implementação toB

## Solução
- Vincular `cyryba`/`cyrybg` ao `:bus-code` de `operation-btn-group`
- Controlar botões por `formMode` e `businessStatus`
- Integrar gaveta `ApprovalProcess` e carregamento de ordem de alteração

## Verificação e Origem
- Arquivos: company/staffManagement/components/detail.vue, components/OperationBtnGroup/index.vue, mixins/detailMixins.js, company/staffManagement/personnelRecord/detail.vue, mixins/form.js, toB/personnelRecord/components/detail.vue, mixins/formComponents.js, main.js
- Projeto: 产品2.0; Fonte: 035.md; Sessão: 2f709dc5-4ae2-4b08-9df3-6698a076d982

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "staff_approval_code",
  "source_extraction_id": "48b19525c64140a5b949b1bdad141457",
  "version": 1,
  "memory_type": "entities"
}
-->