# Filtro de conta regulatória pública em diálogo bancário
No projeto Suzhou Housing G, o parâmetro isPubRegulatoryAccount é enviado apenas quando o modo não é 'openedAdd'.

## Causa e solução
- Em detail.vue, a função showBankDialog verifica formMode.
- Se formMode != 'openedAdd', envia isPubRegulatoryAccount:'1' para filtrar bancos operadores.
- Caso contrário, não envia o parâmetro.

## Arquivos envolvidos
- src/views/benefit/pubRegulatoryAccount/detail.vue
- src/views/system/regionBankAuth/detail.vue
- src/utils/workBank.js
- src/views/property/propertyAccount/detail.vue
- src/views/benefit/pubRegulatoryAccount/index.vue

## Verificação
- 验证证据: 苏住房G/088.md (documento interno).
- Sessão de origem: d88a1f97-8d9a-4d6d-a7cd-02ddf13b5a0d.
- Linha de base de código: none.

<!-- MEMORY_FIELDS
{
  "category": "Correção de bug",
  "name": "pub_reg_account_param",
  "source_extraction_id": "d932d4a67f654d5dbfff00e631306d33",
  "version": 1,
  "memory_type": "entities"
}
-->