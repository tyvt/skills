# Anexos de aprovação de entrega de projeto devem ter caminho relativo normalizado
No projeto Suzhou Real Estate Monitoring V3, interfaces `detail`/`approval` de entrega de projeto ganharam lógica de anexo; `projectDeliveryConstants.js` normaliza `approvalAttachment`.

## Normalização
- `projectDeliveryConstants.js` adiciona `normalizeApprovalAttachmentList` etc. para normalizar `approvalAttachment`
- Submissão carrega array de strings `fileSite` de caminhos relativos

## Mudanças no diálogo
- `ProjectDeliveryApprovalDialog.vue` adiciona `FileUpload` obrigatório (máx 10)
- `ProjectDeliveryDetail.vue` e `ProjectDeliveryInfoPanel.vue` ajustados

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/071.md
- 涉及文件: doc frontend, 路由信息.json, 前端技术信息.md, xmjf.js, ProjectDeliveryApprovalDialog.vue, ProjectDeliveryDetail.vue, projectDeliveryConstants.js, ProjectDeliveryInfoPanel.vue
- Sessão: f25b074f-2774-4b55-bbb6-fe05b1d2cad4; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "delivery_attach_norm",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->