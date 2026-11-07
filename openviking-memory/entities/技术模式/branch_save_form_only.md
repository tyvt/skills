# 分支机构保存仅验证表单，无附件预校验
在苏州市房地产监测V3中，代理分支机构的保存改为仅验证表单，移除了提交、审批和附件预校验的逻辑。

## 背景与目标
- 主代理机构注册后，后端自动注册；前端不再需要处理提交和审批
- 简化分支机构的保存流程；附件上传不再作为保存的前置阻塞

## 变更
- `AgencyBranchDetail.vue` 仅调用 `handleSave` 进行表单验证
- 停用 `show-submit` 和 `show-approval`（提交和审批入口）
- `agencyBranch.js` 移除 `listAgencyBranchAppendix` 和 `validateAppendix`（预校验）
- 在 complex/detail.vue, detailMixins.js, form.js 等文件中进行了同步调整

## 测试影响
- E2E 移除因缺少附件而阻塞的场景
- 保存不再因缺少附件而失效

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：40edb9e5-354a-4c2b-8557-eea7a3245770
- 验证证据: src=苏州市房地产监测V3-rest/072.md
- 涉及文件: AgencyBranchDetail.vue, complex/detail.vue, detailMixins.js, form.js, formComponents.js, vite.config.js, OperationBtnGroup/index.vue, AgencyBranchList.vue
- 所属项目: 苏州市房地产监测V3; 会话: 40edb9e5-354a-4c2b-8557-eea7a3245770; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_save_form_only",
  "source_extraction_id": "f3025b0b72ad4d9da2b7a5d18356898a",
  "version": 1,
  "memory_type": "entities"
}
-->