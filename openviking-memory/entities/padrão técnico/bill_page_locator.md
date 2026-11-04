# Página de fatura estilo captura não encontrada; feeBills é a mais próxima
O repositório 产品2.0 não tinha página correspondente à captura com colunas de item de custo/tarifa e aba de desconto de recebimento; o módulo mais próximo é feeBills.

## Problema
- Nenhuma página no repositório 产品2.0 batia com a captura (colunas de projeto de custo/tarifa e aba de desconto de recebimento).

## Localização
- Módulo mais próximo: faturas de taxa de condomínio (feeBills).
- Página principal de lista: property/bill/components/index.vue.
- Entradas incluem property/bill/service/index.vue (type=1), property/feeDeclare2/index.vue, property/shareFee/index.vue.

## Arquivos e origem
- Arquivos: property/bill/components/index.vue; property/bill/service/index.vue; property/feeDeclare2/index.vue; property/shareFee/index.vue; mixins/listMixins.js; mixins/table.js; property/declare/components/feeBindScopeTable.vue; property/bill/components/feeBindScopeTable.vue.
- Evidência: sessão cursor e57753a2-9e6d-4464-a761-3a7905b9034a.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "bill_page_locator",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 1,
  "memory_type": "entities"
}
-->