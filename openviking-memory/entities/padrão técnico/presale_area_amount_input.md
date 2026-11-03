# Presale area field switched to amount-input component
No módulo 苏州市房地产监测V3, PermitInfoPanel.vue usa amount-input no modo de edição substituindo zs-input para entrada de valores monetários.

## Pontos de mudança
- PermitInfoPanel.vue em modo de edição usa amount-input (unit="㎡", :dot="2", v-money) substituindo zs-input
- Modo de visualização formatado via formatFixedDecimal
- presaleAreaValue retorna '' quando vazio
- presaleAreaText retorna '-' quando vazio

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/145.md
- Arquivos: presale/permit/components/detail.vue, presale/permit/permitConstants.js, presale/permit/components/PermitInfoPanel.vue, projectManagement/buildinginfo/detail.vue, package.json, contract/dialogs/pricingModeDialog.vue, vite.config.js, main.js
- Sessão: 52e97276-20ef-4050-8053-34217a106e19; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "presale_area_amount_input",
  "source_extraction_id": "afd68a6c072143ec9e83e94f7a4a492d",
  "version": 1,
  "memory_type": "entities"
}
-->