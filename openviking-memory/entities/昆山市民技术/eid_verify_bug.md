# 响应拦截器仅认200致E证通核身失败
昆山市民 axios 响应拦截器仅认严格 HTTP 200 而提前 reject，导致 E 证通核身接口日志 code 200 仍提示失败。

## 问题根因
- 响应拦截器仅认 HTTP status 严格 200，提前 reject
- E 证通核身接口返回 code 200 但被拦截器误判失败

## 修复方案
- 修改 src/request/index.js 兼容 res.status/res.statusCode 及 2xx
- 调整 src/pages/common/useEidVerify.js 以 code/message 判断成功并增加兜底 resolve

## 涉及文件
- src/api/modules/estate.js
- src/pages_onlineService/onlineIndex.vue
- src/pages/common/useEidVerify.js
- API接口文档.md
- src/pages/verifyUser/index.vue
- src/pages/verifyUser/info.vue
- src/env/mp.js
- src/mp_ecard_sdk/main.js

## 验证与归属
- 来源会话ID：ea82ec90-7cc1-4d38-b7d1-2394a7ad3f09
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "eid_verify_bug",
  "source_extraction_id": "ab8c60a92ea7445d845556d78d295742",
  "version": 1,
  "memory_type": "entities"
}
-->