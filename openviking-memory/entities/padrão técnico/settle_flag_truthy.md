# Flag de string '0' aciona falsamente aviso de liquidação
Em maintenance/final/index.vue, o v-if="settleWarnFlag" trata string '0' como verdadeiro em JS, causando exibição indevida.

## Causa raiz
- UI de aviso de liquidação usava v-if="settleWarnFlag" avaliando truthy; string '0' é truthy em JS.

## Solução
- Seguir convenção do repositório usando comparação explícita == '1' para flags.

## Arquivos envolvidos
- maintenance/final/index.vue
- maintenance/completion/detail.vue
- maintenance/final/detail.vue
- mixins/listMixins.js, ListTemplate.js, table.js
- property/workOrder/order/index.vue
- maintenance/maintenanceApply/detail.vue

## Verificação e origem
- Evidência: sessão cursor 7fd96eae-ff4a-4cde-8f71-536de88bfa82
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "settle_flag_truthy",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->