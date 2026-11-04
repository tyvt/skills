# Conta bancária de retorno editável por falta de exclusão de estado
No projeto 淮安物管, a conta bancária retornada pelo banco ficava editável na tela de detalhe por não se excluir o estado de retorno.

## 问题根因
- `pubRegulatoryAccount/detail.vue` tinha `canEditRegulatoryAccountFields` retornando true em modo de edição com conta presente.
- Isso permitia editar conta de retorno bancário (`accountOpenType == '0'`).

## Correção
- A edição passou a ser permitida apenas para `openedAdd` ou `accountOpenType == '1'`.
- Conta de retorno bancário ficou somente leitura.

## Arquivos envolvidos
- `benefit/pubRegulatoryAccount/detail.vue`
- `property/propertyAccount/detail.vue`

## Verificação
- Sessão cursor: be883941-555c-45f9-bd6f-1078dd8d0fc0
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_return_editable",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->