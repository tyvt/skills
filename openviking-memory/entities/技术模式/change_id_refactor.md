# 变更ID解析最小冗余收口
苏州市房地产监测V3 中变更单 ID 解析逻辑已按「最小冗余」收口，行为不变，重复实现统一引用 resolveChangeId.js。

## 已删/合并
- form.js：去掉 coerceIdFieldValue，详情参数交给全局 coerceRequestBodyIds + serializeJsonRequestBody
- requireChangeIdForRequest：在 getCompanyRecordChangeDetail / submitByLogin 里内联两行 resolveChangeId + 校验
- Vue 调用：resolveChangeId(res.data, res) → resolveChangeId(res.data)（3 处）
- E2E：删除 company-helpers 里重复的 resolveChangeId 实现，改为引用 resolveChangeId.js；fetchLastChangeId 只用 body.data

## 保留
- jsonParseSafeIds.js：响应长整数、coerceRequestBodyIds、serializeJsonRequestBody 仍需要

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：form.js、resolveChangeId.js、jsonParseSafeIds.js
- 所属项目：苏州市房地产监测V3；来源会话：73b844d6-16b5-409e-b3b2-20d22170917a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_id_refactor",
  "source_extraction_id": "a43abec617b04cbbb35cf2e96893e74d",
  "version": 1,
  "memory_type": "entities"
}
-->