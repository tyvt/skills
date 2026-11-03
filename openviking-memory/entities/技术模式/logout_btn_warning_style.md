# 注销按钮误用 warning 样式致对比度低
苏州市房地产监测V3 的 zhi2-web-admin 中 AgencyBranchList.vue 注销按钮误用 warning 样式致对比度低文字不清，改为与编辑按钮对齐的 plain 样式。

## 问题根因
- `AgencyBranchList.vue` 中注销按钮 `attrs` 误用 `{ type: 'warning', plain: true }` 致对比度低文字不清

## 修复方案
- 改为 `{ plain: true }` 对齐编辑按钮白底深灰文字样式且弹窗逻辑不变

## 涉及文件
- zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchList.vue
- zhi2-web-admin/src/mixins/table.js
- zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- zhi2-web-admin/e2e/institution/agency-branch-status.spec.js
- zhi2-web-admin/e2e/fixtures/auth-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/185.md（另见 rest/144.md）
- 来源会话ID：179c726e-0dbb-4fbb-9cb6-41517bdd74a9
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "logout_btn_warning_style",
  "source_extraction_id": "c8b2ccc826f04b5795a9822e8b7419bd",
  "version": 2,
  "memory_type": "entities"
}
-->