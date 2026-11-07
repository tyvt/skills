# 一般表决结果结论展开收起换行失效
太仓一网通办H5 的一般表决结果「结论说明」展开后长字符串横向撑出容器，因换行样式误置于收起选择器内。

## 问题根因
- 换行样式 word-break: break-all 误写在 .conclusion:not(.expanded) 内
- 展开后该选择器失效，遇 KWKWKWKW 等无空格长字符串横向撑出容器

## 修复方案
- 将 max-width:100%、word-break:break-all、overflow-wrap:anywhere 放到 .conclusion 基础类
- 仅收起状态保留 3 行截断样式

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/views/owner-decision/components/ResultStatisticsTab.vue、src/views/owner-decision/OwnerDecisionResult.vue、src/views/decision/common/ResultStatistics.vue
- 所属项目：太仓一网通办H5；来源会话：6de96daa-5628-45ab-973a-7050b7183f94；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "conclusion_expand_bug",
  "source_extraction_id": "b620b21275c34065997323fd9392c72d",
  "version": 1,
  "memory_type": "entities"
}
-->