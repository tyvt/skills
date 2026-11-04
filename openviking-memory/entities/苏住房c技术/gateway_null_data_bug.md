# 网关data为null字符串致解析走兜底
苏服办网关返回 data 为字符串 "null" 导致解析走兜底的缺陷。

## Description
- 网关返回 data 是字符串 "null" 而非 JSON 对象
- gateway.js 直接透传导致 httpInstance.js 缺少 code/msg 字段走兜底

## Required Fix
- 需校验 data 类型并解析 msg 真实错误信息

## Involved Files
- src/api/index.js
- src/api/httpInstance.js
- src/api/gateway.js
- src/pages_owner/authentication/components/FormManual.vue
- src/api/property.js
- src/utils/sfb.js
- src/pages_owner/authentication/components/HouseAdd.vue
- src/api/v1Instance.js

## Verification
- 验证证据：苏住房C/042.md
- 来源会话ID：949376aa-2a8f-4366-9f75-db6d23ef2d53
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "gateway_null_data_bug",
  "source_extraction_id": "1198c13d69754632813bd8ca344722ae",
  "version": 1,
  "memory_type": "entities"
}
-->