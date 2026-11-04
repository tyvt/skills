# 计算属性 appendixBusCode 缺失导致 Vue 警告
在项目 苏州市房地产监测V3 中，`AgencyBranchDetail.vue` 在编辑模板中绑定了未定义的属性 `appendixBusCode`，触发了 Vue 警告。

## 问题根因
- `AgencyBranchDetail.vue` 的编辑模板引用了未定义的 `appendixBusCode`
- `AnnexUpload` 在查看模式下未接收 `:bus` 绑定

## 解决方案
- 添加计算属性 `appendixBusCode`，从 `$route.meta.busCode` 读取，或以 `AGENCY_BRANCH_APPENDIX_BUS` 作为回退
- 在查看模式下，`AnnexUpload` 同步 `:bus` 绑定以消除警告

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/068.md
- 涉及文件: AgencyBranchDetail.vue, AnnexUpload/index.vue, CancelDialog.vue, AgencyPersonnelDetail.vue, utils/routeMeta.js, docs/agencyBranch-menu.md, e2e/institution/agency-branch-flow.spec.js, mixins/detailMixins.js
- 所属项目: 苏州市房地产监测V3; 会话: f9505d8d-b469-4811-976f-799ef8de543a; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "missing_appendix_bus",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->