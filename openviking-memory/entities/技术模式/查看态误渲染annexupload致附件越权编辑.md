# 查看态误渲染AnnexUpload致附件越权编辑
经纪机构从业人员查看态误渲染可操作附件组件，已改用只读附件区修复。

## 缺陷描述
- `AgencyPersonnelDetail.vue` 中 `canOperateAppendix` 仅校验 `personnelRecordId` 使查看态仍渲染可操作 `AnnexUpload`
- 导致附件越权编辑风险

## 修复方案
- 查看态改用 `AppendixPackageSection(is-view=true,operable=false)` 经 `DetailTemplate` 只读
- G/B端 `staffManagement/toB/personnelRecord` 要件区 `:is-view` 绑 `isFormDisabled` 且 `appendixOperable` 简为 `!isFormDisabled`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/003.md
- 涉及文件：companyRegister/detail.vue、agreement/account/detail.vue、companyRegister.js、institutionRegister/detail.vue、companyApplyAudit/detail.vue、OperationBtnGroup/index.vue、AgencyBasicInfoDetail.vue、LicenseAppendix.vue
- 来源会话ID：e36fc0b7-1ece-4548-a186-f880f79e7879
- 代码基线：none
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "查看态误渲染AnnexUpload致附件越权编辑",
  "source_extraction_id": "cbc19062b1a94d06817b4cb8938004dd",
  "version": 1,
  "memory_type": "entities"
}
-->