# 结论展开溢出因word-break样式置于收起态
太仓一网通办H5 的结论区域因 word-break 样式仅作用于收起态，展开后遇长字符串横向撑出容器。

## 问题根因
- .conclusion:not(.expanded) 包含 word-break: break-all
- 展开后该样式被移除，遇无空格长字符串横向撑出容器

## 修复方案
- 将 word-break: break-all 与 overflow-wrap: anywhere 移至 .conclusion 基础类
- 截断样式仅保留于 :not(.expanded) 中

## 验证与归属
- 验证证据：extracted source=cursor session=6de96daa-5628-45ab-973a-7050b7183f94
- 涉及文件：src/views/owner-decision/components/ResultStatisticsTab.vue、src/views/owner-decision/OwnerDecisionResult.vue、src/views/decision/common/ResultStatistics.vue、src/views/election/components/GroupResult.vue
- 所属项目：太仓一网通办H5；来源会话：6de96daa-5628-45ab-973a-7050b7183f94；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "conclusion_word_break_bug",
  "source_extraction_id": "ce2fc0065fb543bc9d68e84262ae7ddf",
  "version": 1,
  "memory_type": "entities"
}
-->