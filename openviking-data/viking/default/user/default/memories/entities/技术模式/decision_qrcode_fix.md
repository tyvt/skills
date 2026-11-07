# 扫码进入表决详情 decisionId 解析修复
泰兴小程序扫普通链接二维码进入表决详情时 `decisionId` 为 undefined 的问题已修复。

## 问题根因
- 扫普通链接二维码时微信把完整 URL 放在 `options.q`，链接 `https://txzhwy.cn/decision?id=2084187356435521536` 解析后为 `query.id`
- 详情页原只取 `query.decisionId`，导致 `decisionId` 为 `undefined`，请求打到 `/decision/undefined`

## 修复方案
- 与 `elect/detail.vue`、`optional/DecisionResult.vue` 一致，兼容 `options.id`、`query.id`、`query.decisionId`
- 没有 id 时提示且不再发请求
- 解析逻辑：`const query = options.q ? urlToObj(decodeURIComponent(options.q)) : {}`，再取 `decisionId.value = options.id || query.id || query.decisionId || ''`、`decisionType.value = options.type || query.type || ''`
- 修复提交 `ddd8f82` 同时删除了原 `console.log("decision detail onLoad options")` 调试日志

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`src/pages_owner/decision/detail.vue`、`elect/detail.vue`、`optional/DecisionResult.vue`、`src/utils/index.js`、`src/pages.json`
- 来源会话ID：a60f6a66-186c-48b6-9f7b-49ef0f967601、10ca1b8a-479f-41d6-a345-fad281b362e9
- 修复提交：`ddd8f82`（用户报错日志中的 `decision detail onLoad options` 来自此提交前的旧版本）
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_qrcode_fix",
  "source_extraction_id": "969d882027964c87a9e76ee21a7fe4b1",
  "version": 2,
  "memory_type": "entities"
}
-->