# Detail Driver Import
`maintainDecision/detail.vue` 重构时删除 `mfcontractguardDriver` 的 import，但 `mounted` 仍调用 `driverStart` 启动引导，导致未定义。

## 问题根因
- 重构删除 import 但保留调用，引发运行时引用错误。

## 修复约定
- 补回 `import mfcontractguardDriver from '@/views/repairFunds/usage/fundUsageKs/driver'` 恢复引用。

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：src=太仓G/009.md
- 涉及文件：zhi1-web-admin/src/views/estate/maintainDecision/detail.vue、directives/formatter/money.js、ownerDecision/detail.vue、components/AmountInput/index.vue、fundUsageKs/driver.js
- 所属项目：太仓G；来源会话：8f9057d0-7dbf-4966-9b52-d5d8411e8e4b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "detail_driver_import",
  "source_extraction_id": "753a048e5c3947b4b939168968e98562",
  "version": 1,
  "memory_type": "entities"
}
-->