# 股东表合并的安全格式化
`ShareholderPlainTable.vue` 为合并模式添加 prop `beforeRows`；一侧的 `undefined` 值应使用安全的 formatter 而不是 `percentFormatter`。

## 问题根因
- `rimraf` 被安全删除保护阻止，留下了 `.tmp-verify-dist` 残留，需要手动清理
- 合并行时，一侧为 `undefined` 在使用 `percentFormatter` 时会导致 `undefined%`

## 解决方案
- `ShareholderPlainTable.vue` 接收 prop `beforeRows` 以启用合并模式
- `mergedRows` 通过 `shareholderId`→`idNumber`→股东名称 (fallback) 进行匹配
- 对 `undefined` 一侧使用空值安全的 formatter，而非 `percentFormatter`

## 文件与归属
- 验证证据: src=苏州市房地产监测V3-rest/122.md 和 src=苏州市房地产监测V3/143.md
- 涉及文件: ShareholderChangeSection.vue, ShareholderPlainTable.vue, SurveyChangeHouseTable.vue (toB/companyRecord 和 presale/surveyChange), DeveloperBasicInfoForm.vue, formatters/index.js, main.js, element.js
- 所属项目: 苏州市房地产监测V3; session: f1fe42af-7198-4586-90dc-5a34ed97f963; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_merge_nullsafe",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 2,
  "memory_type": "entities"
}
-->