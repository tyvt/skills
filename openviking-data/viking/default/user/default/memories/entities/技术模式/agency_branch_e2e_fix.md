# 经纪机构分支保存 E2E 测试修复
苏州市房地产监测V3 修复 `AgencyBranchDetail.handleSave` 的 E2E 测试因必传要件未上传被前端拦截导致超时的问题，并补充测试 fixtures 与 helpers。

## 问题根因
- `AgencyBranchDetail.handleSave` 在发 `/company/agencyBranch/submit` 前会调用 `checkRequiredAppendix`
- 测试只 `patchComponentForm` 填表、未上传必传要件，保存被前端拦截，导致 `waitForResponse` 超时

## 修复内容
- 新增测试附件 fixture（`e2e/fixtures/assets/`）：`test-appendix.png`（图片类要件）、`test-appendix.pdf`（仅 PDF 要件，如「新入网登记表」）
- `institution-helpers.js` 新增 helper：`uploadRequiredAppendix(page, testId)` 遍历 `.required` 要件项，按 `.el-upload__tip` 选择 png/pdf 上传并等待 `/file/appendix/upload`；`clickSaveAndWaitForSubmit(page, matchSubmit)` 点击保存并等待 submit

## 验证
- 全部 5 条用例中 4 条通过、1 条按预期 skip

## 涉及文件与归属
- `e2e/institution/agency-branch-real-api-flow.spec.js`、`institution-helpers.js`
- 所属项目：苏州市房地产监测V3；来源会话：78e37b39-59fb-4f08-9f79-e96bf254bdd1
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_e2e_fix",
  "source_extraction_id": "b6820f9cb17546e1b9b6efc01324a33b",
  "version": 1,
  "memory_type": "entities"
}
-->