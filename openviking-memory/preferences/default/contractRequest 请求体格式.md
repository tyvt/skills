- contractRequest.js 中的请求体已从 `{ houseId }` 改为 ID 数组，兼容单个 ID 或数组
- 接口 POST /prefund/paymentNotice/hasUnFinishDepositNotice 路径保持不变 (复用原接口)
- chooseHouseDialog.vue 在签署前校验，传递 `this.targetData.map(item => item.houseId)` 而不是 `join(',')` 字符串
- 涉及文件: 路由信息.json, MEMORY.md, 前端技术信息.md, BuildingDialog.vue, NoticeContractDialog.vue, notice.js, vite.config.js, convert-api-v3.mjs
- 验证: src=苏州市房地产监测V3/046.md; session 6c4e1de0-c778-4353-bd4e-b5ee4ceccaab

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：6c4e1de0-c778-4353-bd4e-b5ee4ceccaab


<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "主题标题: contractRequest 请求体格式",
  "source_extraction_id": "a4d28a9776d549a1a813bc4467d14de7",
  "version": 1,
  "memory_type": "preferences"
}
-->
