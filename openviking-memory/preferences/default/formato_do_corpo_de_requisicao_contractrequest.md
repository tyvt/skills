- Corpo da requisição em contractRequest.js alterado de `{ houseId }` para array de IDs, compatível com id único ou array
- Caminho da interface POST /prefund/paymentNotice/hasUnFinishDepositNotice inalterado (reutiliza interface original)
- chooseHouseDialog.vue valida antes da assinatura passando `this.targetData.map(item => item.houseId)` em vez de `join(',')` string
- 涉及文件: 路由信息.json, MEMORY.md, 前端技术信息.md, BuildingDialog.vue, NoticeContractDialog.vue, notice.js, vite.config.js, convert-api-v3.mjs
- Verificação: src=苏州市房地产监测V3/046.md; sessão 6c4e1de0-c778-4353-bd4e-b5ee4ceccaab

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "Formato do corpo de requisição contractRequest",
  "source_extraction_id": "a4d28a9776d549a1a813bc4467d14de7",
  "version": 1,
  "memory_type": "preferences"
}
-->