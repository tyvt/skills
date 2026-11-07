# 合计行与表格宽度不一致（全局 padding）
园区物管2.0 中合计行写在 table-section 下，不继承 zs-table-container 的左右 padding，导致比表格宽 24px。

## 现象
- 信用报告等页面表格下方合计行与表格左右边缘差约 24px，调合计行自身样式都对不齐。

## 根因
- 全局 .list-container .zs-table-container 给表格容器加左右各 12px padding。
- 合计行写在 .table-section 下、不在 zs-table-container 内部，不继承该 padding，天然比表格宽 24px。

## 修复方案
- 不要改全局 zs-table-container padding（影响所有列表页）。
- 在页面的 .table-section 作用域内把 zs-table-container 的 padding 重置为 0，使表格与合计行对齐。
- 排查「两个并排块宽度不一致」优先检查是否处不同容器层级、全局样式是否只给其中一个加 padding。

## 关联信息
- 涉及文件：src/views/evaluation/companyReport/components/detail.vue、src/views/credit/companyEvaluation/components/detail.vue；代码基线 f101dd464。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "summary_row_bug",
  "source_extraction_id": "37c782270dad448bb86143b13a756fbb",
  "version": 1,
  "memory_type": "entities"
}
-->