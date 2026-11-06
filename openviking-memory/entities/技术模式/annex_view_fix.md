# 从业人员详情附件区查看态修复
苏州市房地产监测V3 中经纪机构从业人员查看态误渲染可操作附件上传，已改为从审批流取数只读展示。

## 问题根因
- 查看态仍渲染 `AnnexUpload`，因 `canOperateAppendix` 有 `personnelRecordId` 即为 true

## 修复内容
- `AgencyPersonnelDetail.vue` 查看态：`AnnexUpload` → `AppendixPackageSection`(`is-view=true`,`operable=false`)→`DetailTemplate` 只读
- 编辑态：`AppendixPackageSection`(`is-view=false`,`operable=!isFiledReadonly`)，`busCode` 从路由解析，顶部 `:show-attachment="false"`
- G/B 端从业人员备案：`appendixOperable` 简化为 `!isFormDisabled`，与表单禁用态一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyPersonnelDetail.vue、companyRegister/detail.vue、supervision/agreement/account/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：e36fc0b7-1ece-4548-a186-f880f79e7879；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "annex_view_fix",
  "source_extraction_id": "0c115a7a4e2d4c988b4d8dbe0f854d96",
  "version": 1,
  "memory_type": "entities"
}
-->