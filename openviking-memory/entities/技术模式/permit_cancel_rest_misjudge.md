# 预售许可注销接口cancel被误判为REST动作
苏州市房地产监测V3 中 `apiV3Normalize.js` 的请求拦截器将 `cancel` 误判为 REST 动作，导致分页接口 400，已在 `normalizeTrailingPathParams` 修复。

## 问题根因
- `index.vue` 通过 `listMixins` 拼出的地址正确：`POST /presale/permit/cancel/page`
- `apiV3Normalize.js` 拦截器把 `cancel` 当 REST 动作，把末尾 `page` 当成 `id` 移进 body，URL 被改成 `/presale/permit/cancel`，返回 400
- `permit/extend` 不受影响，因 `extend` 不在 `REST_ACTIONS` 里，仅 `cancel` 触发误判

## 修复方案
- 在 `apiV3Normalize.js` 的 `normalizeTrailingPathParams` 中修复 `cancel` 误判逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`presale/permitCancel/index.vue`、`mixins/table.js`、`apiV3Normalize.js`、`presale/permitExtend/index.vue`、`permitCancelConstants.js`
- 所属项目：苏州市房地产监测V3
- 来源会话ID：f82e7cc4-5b9a-49e7-9c22-7583b0a8d615

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_cancel_rest_misjudge",
  "source_extraction_id": "756cd836611b4b25b7366c1b7ae83809",
  "version": 1,
  "memory_type": "entities"
}
-->