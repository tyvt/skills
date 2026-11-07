# 维修资金表决详情驱动未定义报错修复
太仓G端 `maintainDecision/detail.vue` 报错 `mfcontractguardDriver is not defined`，因重构误删 import，已补回依赖修复。

## 问题根因
- 最近的重构中，`maintainDecision/detail.vue` 把 `mfcontractguardDriver` 的 import 删掉了
- 但 `mounted` 里仍用它启动引导（`driverStart`），导致未定义报错

## 修复方案
- 补回 import：`import mfcontractguardDriver from '@/views/repairFunds/usage/fundUsageKs/driver'`

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：maintainDecision/detail.vue、src/directives/formatter/money.js、ownerDecision/detail.vue
- 所属项目：太仓G；来源会话：8f9057d0-7dbf-4966-9b52-d5d8411e8e4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintain_driver_import_fix",
  "source_extraction_id": "d961989966bf414fa4cdf5a06897d486",
  "version": 1,
  "memory_type": "entities"
}
-->