# Botão de visualização de licença pré-venda não implementado após registro
No projeto 苏州市房地产监测V3, o botão "Visualizar licença de pré-venda" na página de detalhes após o registro não estava implementado; foi corrigido.

## Causa raiz
- O botão "Visualizar licença de pré-venda" na página de detalhes após registro não estava implementado

## Solução
- `permitConstants.js` adicionou `resolvePermitFileUrl()` para resolver o endereço do anexo
- `detail.vue` renderiza o botão quando `isRecorded` e em modo de visualização, iniciando o fluxo

## Verificação e origem
- Evidência: src=cursor session=8f60e217-5cbf-4370-829a-83d765cd7761
- Arquivos: presale/permit/components/detail.vue, components/OperationBtnGroup/index.vue, detail-template-long-labels.md, permitConstants.js, utils/resolveServerAssetUrl.js, presale/entrustSale/components/detail.vue
- Projeto: 苏州市房地产监测V3; sessão: 8f60e217-5cbf-4370-829a-83d765cd7761

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "permit_record_view_btn",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->