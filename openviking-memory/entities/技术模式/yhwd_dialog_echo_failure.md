# YhwdDialog sem interface de detalhe e timing causava falha de exibição
No projeto 苏州市房地产监测V3, `YhwdDialog.vue` não chamava interface de detalhe nem formatava valores, e `YhwdTable.vue` não abria o diálogo após `$nextTick`, falhando a exibição de ponto de rede bancária.

## 问题根因
- `YhwdDialog.vue` não chamava a interface de detalhe e não formatava os valores do formulário
- `YhwdTable.vue` não abria o diálogo após `$nextTick`

## Correção principal
- `YhwdDialog.vue` recebeu `loadDetail()` e `normalizeFormValues()` para preencher e converter dados
- `YhwdTable.vue` faz cópia rasa dos dados da linha e dispara `@open` após `$nextTick`

## Verificação e atribuição
- 验证证据: src=苏州市房地产监测V3/219.md
- 涉及文件: supervision/bank/cbyh/components/YhwdDialog.vue, supervision/bank/cbyh/components/YhwdTable.vue, api/jgyh/yhwdgl.js, supervision/bank/superviseBank/components/YhwdDialog.vue, supervision/bank/jgwd/detail.vue, components/OperationBtnGroup/index.vue, maintenance/bank/components/YhwdDialog.vue, mixins/dialogMixins.js
- 所属项目: 苏州市房地产监测V3; Sessão: 224ebc32-0868-4266-a756-0afa83014b18; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yhwd_dialog_echo_failure",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 1,
  "memory_type": "entities"
}
-->