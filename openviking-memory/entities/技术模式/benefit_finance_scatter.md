# 公共收益财务管理模块分散无聚合页
在产品2.0的zhi2-web-admin中，公共收益-财务管理功能没有pubFinanceManage聚合页，而是分散在三个独立业务目录。

## 实际落点
- 标准账套：views/benefit/pubStandardAccountSet/（index.vue、detail.vue、components/financialSubjectsTable.vue、financialSubjectsDialog.vue），接口api/benefit/pubStandardAccountSet.js与pubStandardFinancialAccount.js
- 生成凭证：入口在views/benefit/pubTradeModel/index.vue批量/单条「生成凭证」，查看凭证弹窗components/modelDialog.vue；pubCheckoutManage也带凭证表格
- 凭证模板：views/benefit/pubVoucherTemplate/（detail.vue、components/templateStyleTable.vue、templateStyleDialog.vue），「选择会计科目」弹窗即components/treeTable.vue

## 检索做法
- 用中文业务关键词（会计科目/凭证模板/物业管理区域）反查目录，不要按拼音缩写猜目录名
- 按「目录=列表index+detail+components子表/弹窗」骨架确认四件套是否齐全

## 验证与归属
- 验证证据：会话53a077ce探索「公共收益-财务管理」页面，结论未找到pubFinanceManage
- 涉及文件：zhi2-web-admin/src/views/benefit/pubStandardAccountSet/*、pubTradeModel/index.vue、pubVoucherTemplate/*等
- 所属项目：产品2.0；来源会话：53a077ce-fa1c-4e73-8454-1aa02c59eacb；代码基线：2e3ec05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_finance_scatter",
  "source_extraction_id": "67b23d034f0041818d5b4edc1485c979",
  "version": 1,
  "memory_type": "entities"
}
-->