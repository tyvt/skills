# 在 V3 规范化中覆盖 getByKey
`getByKey` 被 `ByKey` 规则推断为 `key`，导致 `apiV3Normalize.js` 中的 `ACTION_PATH_PARAM_KEYS` 映射不起作用。

## 问题
- `getByKey` 函数被 `ByKey` 规则优先作为 `key` 参数，使得 `configKey` 的映射失效。
- 导致对于诸如 system/config 的端点，请求体错误地变为其他内容，而不是 `{"configKey":"..."}`。

## 解决方案
- 将 `getByKey: 'configKey'` 添加到同一文件 `apiV3Normalize.js` 的 `ACTION_PARAM_KEY_OVERRIDES` 中（更高优先级），以修正请求体参数。
- `zhi2-web-admin/src/utils/apiV3Normalize.js` 是修复的位置；相关的有 `system/config.js` 和 `request.js`。

## 验证
- 证据 src=产品2.0/065.md; 会话 8dceac0c。
- 文件: src/api/system/config.js, src/utils/apiV3Normalize.js, src/api/index.js, src/utils/request.js, src/views/home/privacy.js。
- 项目: 产品 2.0。

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia do Produto 2.0",
  "name": "getbykey_override",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 1,
  "memory_type": "entities"
}
-->