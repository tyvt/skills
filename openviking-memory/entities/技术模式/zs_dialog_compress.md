# Tabela do diálogo de seleção comprimida e linhas insuficientes
No projeto 园区公共收益 (zhi2-web-admin), o `tableTrCount` fixo do `zs-select-dialog` faz a barra de rolagem horizontal ocupar altura e cortar a última linha; a tabela em `.dialog-right` com `flex:1; min-height:0` é comprimida.

## 问题根因
- `tableTrCount` fixo faz a barra de rolagem horizontal ocupar altura e cortar a última linha
- Tabela em `.dialog-right` com `flex:1; min-height:0` é comprimida/recortada

## 解决方案
- Calcular linhas dinamicamente com reserva de buffer
- Usar `flex-shrink:0` para evitar compressão
- Chamar `doLayout()` após `getList()`

## Arquivos envolvidos
- `zs-select-dialog` (zs-select-dialog.vue, zs-select-dialog-func.vue, SKILL.md)
- `zs-dialog.vue` e `zs-table.vue`
- `pubBankDetailDay/index.vue`

## 验证与归属
- 验证证据: extracted source=cursor session=0369602c-e19b-47c4-b72b-a8e1c7d91b45
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_compress",
  "source_extraction_id": "421380447a664b42a4a5d20500dc7f5e",
  "version": 1,
  "memory_type": "entities"
}
-->