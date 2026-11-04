# Diálogo de juros de reembolso

Padrão de implementação com cálculo e confirmação separados para reembolso de juros.

## Descrição
- Largura do diálogo «Cálculo de juros de reembolso» ajustada para 900px.
- Campo «Tempo de liquidação de juros» renomeado para «Tempo de cálculo de juros de reembolso».
- Chamada `calAmountRefund` exibe tabela (colunas: conta de negócio, localização do imóvel, etc.).
- Chamada `refundAmountInterest` para salvar.
- Localização do imóvel prioriza `position` ou concatenação.

## Relações
- Cálculo e confirmação divididos em etapas independentes.


<!-- MEMORY_FIELDS
{
  "category": "padrão de código",
  "name": "dialogo_juros_reembolso",
  "source_extraction_id": "f43c7056662240278d1b1ff7669d9a4f",
  "version": 1,
  "memory_type": "entities"
}
-->