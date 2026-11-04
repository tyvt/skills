# Código de banco regulatório atribuído errado via branchCode
No projeto 淮安物管, o código do banco regulatório era atribuído com `bankBranchCode` em vez de `bankCode`, divergindo do esperado pelo backend.

## 问题根因
- `pubRegulatoryAccount/detail.vue` e `propertyAccount/detail.vue` tinham callback `showBankDialog` que atribuía `regulatoryBankCode` com `row.bankBranchCode`.

## Correção
- O callback passou a usar `row.bankCode` para casar com o armazenamento de código bancário do backend.

## Arquivos envolvidos
- `benefit/pubRegulatoryAccount/detail.vue`, `benefit/pubWorkBank/detail.vue`
- `benefit/pubRegAccountChange/detail.vue`, `benefit/pubRegAccPropMgmt/detail.vue`
- `maintenance/bank/detail.vue`, `property/propertyAccount/detail.vue`
- `components/zs-select-dialog/zs-select-dialog-func.vue`, `benefit/pubRegulatoryAgreement/detail.vue`

## Verificação
- Sessão cursor: e057ae2f-2107-42b9-9657-ffd0a073d835
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bankcode_misassign",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->