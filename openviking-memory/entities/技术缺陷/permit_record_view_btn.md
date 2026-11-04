# Botão de visualização de licença pré-venda não implementado após registro
No projeto 苏州市房地产监测V3, o botão "Visualizar licença de pré-venda" na página de detalhes após o registro não estava implementado; foi corrigido.

## 问题根因
- O botão "Visualizar licença de pré-venda" na página de detalhes após registro não estava implementado

## 解决方案
- `permitConstants.js` adicionou `resolvePermitFileUrl()` para resolver o endereço do anexo
- `detail.vue` renderiza o botão quando `isRecorded` e em modo de visualização, iniciando o fluxo

## 验证与归属
- 验证证据: src=cursor session=8f60e217-5cbf-4370-829a-83d765cd7761
- 涉及文件: presale/permit/components/detail.vue, components/OperationBtnGroup/index.vue, detail-template-long-labels.md, permitConstants.js, utils/resolveServerAssetUrl.js, presale/entrustSale/components/detail.vue
- 所属项目: 苏州市房地产监测V3; sessão: 8f60e217-5cbf-4370-829a-83d765cd7761

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "permit_record_view_btn",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->