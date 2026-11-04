# HomeTodoTable 斑马纹 !important 冲突 el-table 悬停
首页待办表对斑马纹行写 `#fafafa !important` 会压过 element-ui 与操作列组件的 hover 规则，致悬停无背景。

## 问题根因
- `HomeTodoTable.vue` 对 `tr.el-table__row--striped > td.el-table__cell` 写 `#fafafa !important`
- 选择器权重压过 `element-ui.scss` 与 `zs-operate-column` 的 `tr.hover-row` 规则
- 斑马纹行悬停时整行（含操作列）可能无 hover 背景

## 修复要点
- 删除重复斑马纹声明（全站已由 element-ui + 操作列组件覆盖）
- 或改为 `:not(.hover-row)` / 去掉 `!important` 仅保留非悬停默认态

## 验证与归属
- 验证证据：样式审查 [HIGH] HomeTodoTable.vue:150-153 斑马纹 !important 与 hover 冲突，审查结论 BLOCK 直至修复
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeTodoTable.vue、zhi2-web-admin/src/styles/element-ui.scss、zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- 所属项目：门户；代码基线：ac6513b；来源会话ID：c8240256-b927-47c2-8905-36e64b77e5f3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_stripe_hover",
  "source_extraction_id": "56a38fda692548cf82b2bcef6e1ba103",
  "version": 1,
  "memory_type": "entities"
}
-->