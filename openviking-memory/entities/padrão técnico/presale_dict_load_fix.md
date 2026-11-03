# Correção de carregamento dinâmico de dicionário no formulário de pré-venda
No projeto 苏州市房地产监测V3, o formulário PresalePlanFillForm foi corrigido para carregar dicionários dinamicamente e ajustar campos de data e modo de venda.

## Problema
- Dicionários de dropdown no PresalePlanFillForm.vue não carregavam dinamicamente, causando erro de linkage

## Solução
- Adicionadas constantes de dicionário como LAND_MORTGAGE_STATE em permitConstants.js
- Dropdowns alterados para usar getDicts com carga dinâmica em PresalePlanFillForm.vue
- Campos consentDate e facilityDelivery passaram a usar zs-date-picker
- Condição de exibição da linha de agência corrigida para saleMode === '1'
- normalizeSaleMode() mapeia códigos antigos de modo de venda

## Verificação e arquivos
- Verificação: src=苏州市房地产监测V3/179.md
- Arquivos: PermitPlanPanel.vue, PresalePlanFillForm.vue, permitConstants.js, plan/detail.vue, detail.vue, presale-permit-helpers.js
- Sessão: 44a56ca5-f11d-40ff-a9f2-cd4a229a1f75

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "presale_dict_load_fix",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 1,
  "memory_type": "entities"
}
-->