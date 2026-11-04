# Falha de botão por borda de subtabela e formulário desabilitado
Subtabela com atributo border exibia linhas verticais e, ao ser colocada em zs-form desabilitado, os botões falharam em pop-ups de benefício.

## Descrição
- Componente de subtabela com border gerava separadores verticais visuais.
- Pop-up não alinhado com subVenueDialog causava espaço em branco excessivo.
- Subtabela dentro de zs-form desabilitado acionava fieldset disabled, invalidando botões.

## Solução
- Removido border de subOtherTable e similares.
- subOtherDialog etc. usam tamanhos mini/medium com fullRowLayout e el-row.
- Subtabela movida para fora de zs-form, trocando para el-button.

## Arquivos
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subOtherDialog.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subOtherTable.vue
- zhi2-web-admin/src/mixins/dialogMixins.js
- zhi2-web-admin/src/mixins/form.js
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/detail.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueTable.vue

## Relações
- Sessão fonte: 92e30909-1160-4e65-bfae-414e923ee760 (cursor)
- Projeto: produto 2.0 (zhi2-web-admin)

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "subtable_border_button_fail",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->