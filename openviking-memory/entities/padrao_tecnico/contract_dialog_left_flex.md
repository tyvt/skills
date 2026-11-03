# Flex Incorreto em Diálogo de Novo Contrato Causa Espaço em Branco
No projeto Suzhou Real Estate Monitoring V3, adicionar `flex: 1` a `.dialog-left` criava espaço em branco em diálogos de 80% de largura.

## Causa Raiz
- `.dialog-left` com `flex: 1` esticava a cerca de metade da largura do diálogo de 80%, gerando espaço em branco

## Solução
- Alterar `.dialog-left` para barra lateral fixa `flex: 0 0 290px` e `max-width: 290px`
- Manter lado direito com `flex: 1` para preencher espaço restante

## Verificação e Atribuição
- Evidência: src=苏州市房地产监测V3/199.md
- Projeto: 苏州市房地产监测V3
- Arquivos: chooseHouseDialog.vue (contractMainInfo), zs-select-dialog.vue, ElevatorOpeningDialog.vue, zs-dialog.vue, chooseHouseDialog.vue (contractView), contractMainInfo/index.vue, vite.config.js
- Sessão: f882f9ab-4b6d-42b0-8cfa-ee45d52f7c6b; Base: none


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "contract_dialog_left_flex",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 1,
  "memory_type": "entities"
}
-->