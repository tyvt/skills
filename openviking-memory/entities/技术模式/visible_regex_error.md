# 批量补visible正则误改代码致语法错误
批量补 contentInfo 的 visible 时正则误改 props/watch 里的 visible 为 visible: {, 且 contentInfo 内 visible 行尾缺逗号，引发约 55 处语法错误。

## 问题根因
- 批量补 contentInfo 的 visible 时正则误改 props/watch 里的 visible: { 为 visible: {,
- contentInfo 内 visible 行尾缺逗号
- 引发 OrgTypeDialog.vue 等约 55 处语法错误

## 修复方案
- 全局将 visible: {, 改回 visible: {
- 为表达式形式的 visible 补缺失逗号
- 不改动 visible: { type: ... } 这类 prop 定义

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/011.md
- 涉及文件：zs-dialog.vue、detail-template.vue、migrate-dialog-form-layout.mjs、DetailDialog.vue、tmp-find-detail-dialog.mjs、zs-dialog-form-layout.cjs、eslint-dialog-form-layout-baseline.md
- 来源会话：c9cf03c0-26f2-4824-930b-cef3b4dedcda；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "visible_regex_error",
  "source_extraction_id": "c7f6eb576e6d4f86af40444cea8581f7",
  "version": 1,
  "memory_type": "entities"
}
-->