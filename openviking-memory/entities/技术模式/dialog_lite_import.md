# VoteRangeDialogLite错误引用CandidateConfigTable
太仓G端decisionCommon的VoteRangeDialogLite.vue曾因错误路径引用CandidateConfigTable导致构建失败。

## 问题根因
- VoteRangeDialogLite与optionDecision下VoteRangeDialog用法一致，但Lite版将CandidateConfigTable写成同目录（`./CandidateConfigTable`）或错误别名路径
- 该文件在同目录不存在，构建期报模块找不到，CI/本地npm run test失败

## 修复约定
- 正确import路径：`@/views/estate/optionDecision/components/CandidateConfigTable`
- 跨模块复用表决子组件以optionDecision下VoteRangeDialog为参照，不假设decisionCommon内有同名表组件

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证：会话a96ffabd改全路径后构建通过；src=太仓G/005.md
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/VoteRangeDialogLite.vue、optionDecision/components/CandidateConfigTable.vue、optionDecision/components/VoteRangeDialog.vue
- 所属项目：太仓G；来源会话：a96ffabd-ef31-4e34-998f-48051d851e40；代码基线：f458bc8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_lite_import",
  "source_extraction_id": "afc8268d11fc4ff59123fa7eb053001d",
  "version": 2,
  "memory_type": "entities"
}
-->