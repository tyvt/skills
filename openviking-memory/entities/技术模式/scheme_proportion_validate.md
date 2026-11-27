---
audit_status: invalid
last_checked: 2026-11-27T06:15:15+08:00
verdict_note: 当前代码 companyScheme/detail.vue 无 isChargeTypeProportion；该符号仅见于 memory-migration-archive 归档，非实际源码，记忆描述与现状不符。
---
# 比例费率验证遗漏了0-100和两位小数
服务方案未根据类型差异化验证收费费率；在比例模式下未限制0-100和两位小数。

## 解决方案
- 在 `companyScheme/detail.vue` 中添加 `isChargeTypeProportion` 校验
- 将 `rules` 改为 `computed`，实现比例验证
- 监听 `form.chargeType` 以重新验证

## 涉及的文件
- company/companyScheme/detail.vue, api/company/companyScheme.js
- institution/agencyPersonnel/components/AgencyPersonnelDetail.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据: src=苏州市房地产监测V3-rest/141.md
- 来源会话: 6b993f54-a54c-46d4-bd1e-32b8da6cc3ba; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scheme_proportion_validate",
  "source_extraction_id": "11e2b1a202ee409c843bf7caaf319a48",
  "version": 1,
  "memory_type": "entities"
}
-->