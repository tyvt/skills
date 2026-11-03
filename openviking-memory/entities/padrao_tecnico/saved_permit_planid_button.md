# Botão de Visualização Cinza por Falta de planId em Solicitação Salva
No projeto Suzhou Real Estate Monitoring V3, o botão "查看" de solicitações de permissão salvas ficava desabilitado porque o detalhe nem sempre retornava `planId`.

## Causa Raiz
- A interface de detalhe de solicitação salva pode não retornar `planId`
- O botão "查看" dependia apenas do `planId` local, causando estado cinza

## Solução
- `PermitPlanPanel.vue` aceita `planId` ou `presalePermitId` para habilitar o botão
- `permitConstants.js` ganhou `extractPlanId()` para resolver o campo uniformemente
- `detail.vue` e `plan/detail.vue` integraram a função com fallback de carregamento

## Verificação e Atribuição
- Evidência: src=苏州市房地产监测V3/198.md
- Projeto: 苏州市房地产监测V3
- Arquivos: PermitPlanPanel.vue, detail.vue, plan/detail.vue, detailMixins.js, form.js, ruoyi.js, permitConstants.js, e2e/fixtures/presale-permit-helpers.js
- Sessão: 954f078a-f048-4ccb-a30d-b2fce225de05; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "saved_permit_planid_button",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 2,
  "memory_type": "entities"
}
-->