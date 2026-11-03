# 企业变更返回不保存且formMode重置为view
苏州市房地产监测V3 的 zhi2-web-admin 中企业变更编辑态点返回会重置 URL 且不保存草稿，E2E 测试误匹配空标题节点。

## 问题根因
- E2E 文件 company-record-change.spec.js 中 getByText('') 误匹配空标题节点，仅在联系人有非空值时断言详情页回显
- 企业变更编辑态点返回，URL 重置为 formMode=view 且不保存草稿，再次进入取服务端原值

## 修复方案
- 需修正 E2E 空标题匹配逻辑，并确保返回时按需保存草稿或明确重置行为（对话仅描述现象未给出具体代码改动）

## 涉及文件
- zhi2-web-admin/src/views/company/institutionRegister/index.vue
- zhi2-web-admin/src/views/company/companyManagement/companyBasicInfo/detail.vue
- zhi2-web-admin/src/views/company/companyManagement/change/detail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/companyBasicInfoShared.js
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue
- zhi2-web-admin/src/mixins/detailMixins.js
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/113.md
- 来源会话：db089cf1-03c8-448c-a942-78bec363a420；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_return_view",
  "source_extraction_id": "09a31a0689854a169928cbe032f1d3df",
  "version": 1,
  "memory_type": "entities"
}
-->