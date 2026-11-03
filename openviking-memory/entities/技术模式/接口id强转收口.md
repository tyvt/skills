# 接口ID强转收口全局去冗余
苏州市房地产监测V3 的 zhi2-web-admin 将多处重复 ID 处理逻辑收口到全局工具，消除冗余。

## 问题现象
- 多处重复 ID 处理逻辑造成冗余，form.js 存在 coerceIdFieldValue 等本地实现
- E2E 测试 fixtures 中 company-helpers 重复实现 resolveChangeId

## 解决方案
- form.js 移除 coerceIdFieldValue，详情参数交由全局 coerceRequestBodyIds 与 serializeJsonRequestBody
- Vue 调用 resolveChangeId(res.data) 仅传数据，fetchLastChangeId 仅用 body.data
- E2E 删除 company-helpers 重复实现，改引 src/utils/resolveChangeId.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/007.md
- 涉及文件：companyRecord.js、DeveloperBasicInfoDetail.vue、AgencyBasicInfoDetail.vue、companyRecordAgency/detail.vue、src/api/index.js、src/utils/request.js 等
- 来源会话ID：73b844d6-16b5-409e-b3b2-20d22170917a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "接口ID强转收口",
  "source_extraction_id": "44f7515355854140bc059576d630812f",
  "version": 1,
  "memory_type": "entities"
}
-->