# Diálogo Zs Select Causa Espaço em Branco à Direita
O componente `zs-select-dialog` usava posicionamento absoluto padrão e `dialog-box` com altura fixa, deixando espaço em branco à direita.

## Descrição
- Projeto Suzhou Real Estate Monitoring V3, frontend zhi2-web-admin.
- `zs-select-dialog` posicionava tabela absolutamente com altura fixa causando retrocesso visual.

## Solução
- Em `presale-select-building-dialog` definir `dialog-right` largura 100% para cancelar posição absoluta.
- `dialog-box` alterado para `height:auto`.
- `resolveBuildingList` compatível com `records`/`res.rows` para reduzir exibição errada de vazio.

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/011.md
- Arquivos: presale/permit/components/PresaleSelectBuildingDialog.vue; components/zs-select-dialog/zs-select-dialog.vue; building/houseLimit/components/HouseSelectDialog.vue; presale/cashsale/components/CashsaleSelectBuildingDialog.vue; presale/permit/components/PresaleBuildingTable.vue; supervision/riskmanage/riskregister/components/superviseDialog.vue; presale/permitSelectConstants.js; property/decision/components/SelectComplexDialog.vue
- Sessão: b5dcbf27-aa94-4d27-a97a-978ba9a2e7cd; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "select_dialog_whitespace",
  "source_extraction_id": "187c2553208941ddaccffd0b0decd66f",
  "version": 1,
  "memory_type": "entities"
}
-->