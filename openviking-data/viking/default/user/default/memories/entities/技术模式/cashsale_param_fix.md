# 转现售详情接口参数修复
苏州市房地产监测V3 中修复转现售选证后误传 `sourcePlanId` 的问题，改为使用 `presalePermitId`。

## 修改内容
- `CashsaleDetail.vue` 选证成功后改用 `presalePermitId` 调用 `loadTransferPlan`，不再误传 `sourcePlanId`
- 为 `loadTransferPlan` 补充注释，明确参数必须是 `presalePermitId`
- `cashsale-transfer-helpers.js` 的 `selectTransferPermitInDialog` 增加断言：`detail` 请求体必须包含 `presalePermitId`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`CashsaleDetail.vue`、`cashsale-transfer-helpers.js`、`cashsale-transfer-real-api-flow.spec.js`
- 来源会话ID：62f47b64-e47b-4d88-a102-f9c2d6b48f67
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_param_fix",
  "source_extraction_id": "1b437f2445fb45d88bc3adbd9f0c4f74",
  "version": 1,
  "memory_type": "entities"
}
-->