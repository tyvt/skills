# Reutilização de anexos de pré-venda na transferência para venda à vista
Padrão do Suzhou Monitoramento Imobiliário V3 que reaproveita anexos somente-leitura de pré-venda na transferência para venda à vista.

## Definição de rota
- `cashsaleConstants.js` define o código de negócio `yszxs` reconhecido por `resolveAppendixBusCode`.

## Componente e montagem
- Criar `CashsaleTransferAppendixPanel.vue` que busca anexos de pré-venda (`ysxksq` + `presalePermitId`) marcados como somente-leitura.
- Concatenar anexos do próprio formulário via `AnnexUpload` e `handleConfig`.
- `mapAppendixPackageList` realiza o mapeamento dos anexos.

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/104.md
- Projeto: Suzhou Monitoramento Imobiliário V3; sessão: b682e5d0-7ff0-4125-961e-04c9a7ebb147; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "cashsale_transfer_appendix",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "entities"
}
-->