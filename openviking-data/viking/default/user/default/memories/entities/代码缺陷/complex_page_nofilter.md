# finishedComplexPage 未按已备案过滤
等级单据页选小区接口 finishedComplexPage 未加「已备案等级」过滤，返回全量 8004 条小区，首行小区往往无等级单据。

## 问题现象
- 用 complexName 过滤正常，但不过滤已备案条件时返回全量 8004 条。
- 选中的首行小区常无对应等级单据，后续新增/关联落空。
- 数据量大致下拉/表格加载慢，用户选到无效目标。

## 根因
- 接口名 finished（已完成）暗示只返「有已备案等级」的小区，实现漏了过滤条件。

## 修复要求
- 凡「已完成/已备案」语义列表接口，核对后端是否真加状态过滤，不能只看名。
- 后端查询加 bizState=2（或已备案等级关联表）条件；前端不做兜底过滤（会和分页 total 打架）。
- E2E 加数据量合理性断言（结果条数≠全量小区数、首行小区必须存在已备案等级）。
- 配套：已提交/已备案等级无接口可删/撤销（D8），API 层零残留做不到，残留只能 DB 清理（SQL 见文档 §8）。

## 验证与归属
- 来源会话 00e04b09-06b5-44c0-9662-cf41dca07319（基线 05caac8）
- 涉及文件：zhi2-web-admin/src/views/evaluation/stdEvaluation/serviceGrade/detail.vue；e2e/std-evaluation/cases/02-service-grade-crud.cjs；docs/std-evaluation/api-map-grade.md
- 结论：D11 高 / D8 中 | 新发现（已报给 Lead）；DB 恒为 1 条已备案样本+1 条终审变更日志

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "complex_page_nofilter",
  "source_extraction_id": "6f248a62204c446d94da2fddb78663b8",
  "version": 1,
  "memory_type": "entities"
}
-->