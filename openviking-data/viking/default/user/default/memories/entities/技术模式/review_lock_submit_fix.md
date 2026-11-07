# 审核锁定仍显示提交按钮修复
苏州市房地产监测V3 中 companyRecord/detail.vue 在 displayStatus=2 审核锁定时仍渲染自定义提交按钮的逻辑修复。

## 问题说明
- showSubmitBtn 仅检查 isFormDisabled、companyRecordChangeId、changeBizState，未检查 displayStatus
- 当 displayStatus 为 2 时表单锁定审核，但自定义提交按钮仍可渲染，导致可提交
- 类别 LOGIC_BUG，严重程度 medium

## 涉及文件
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue (行 202-206)
- zhi2-web-admin/src/views/presale/entrustSale/detail.vue
- zhi2-web-admin/src/utils/registerQualification.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：9d7293ea-6be6-4e92-9c44-7488bcd3e226
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "review_lock_submit_fix",
  "source_extraction_id": "0e3ce808053c40fd9e9a60c5229563fe",
  "version": 1,
  "memory_type": "entities"
}
-->