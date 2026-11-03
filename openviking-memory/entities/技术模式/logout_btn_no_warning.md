# 注销按钮不可设 warning 否则对比度过低
苏州市房地产监测V3 中 AgencyBranchList 注销按钮因 warning 类型对比度低，改为 plain 样式。

## 描述
- AgencyBranchList.vue 中「注销」按钮 attrs 含 type: 'warning' 致橙色描边对比度低、文字不清
- 将其改为 { plain: true } 以与「编辑」按钮白底深灰文字样式统一
- 弹窗逻辑保持不变

## 涉及文件
- src/views/institution/agencyBranch/components/AgencyBranchList.vue
- src/mixins/table.js
- src/components/zs-operate-column/zs-operate-column.vue
- e2e/institution/agency-branch-status.spec.js
- e2e/fixtures/auth-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/144.md
- 来源会话：179c726e-0dbb-4fbb-9cb6-41517bdd74a9
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "logout_btn_no_warning",
  "source_extraction_id": "f03252ab12034d9281cc6024c18c407b",
  "version": 1,
  "memory_type": "entities"
}
-->