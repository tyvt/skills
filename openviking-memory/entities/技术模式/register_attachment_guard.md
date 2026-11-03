# 注册表单附件守卫误拦法人非必填提交
苏州市房地产监测V3 中 InstitutionRegisterSingleForm.vue 冗余附件守卫强制必传，致法人全非必填要件时误报。

## 问题根因
- `InstitutionRegisterSingleForm.vue` 提交时除 `missingRequiredNames` 校验外，冗余 `if (!this.attachmentList.length)` 守卫强制至少上传一个附件
- 法人全非必填要件时误报；多步流程 `Step3Appendix.vue` 本无此限制

## 解决方案
- 移除该冗余附件校验，提交仅依赖 `missingRequiredNames` 过滤后的必填项检查（同 `Step3Appendix.vue` 逻辑）

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/313.md（早前记录见苏州市房地产监测V3-leftover/113.md）
- 涉及文件：InstitutionRegisterSingleForm.vue、registerAppendixAdminType.js、CompanyRegisterSingleForm.vue、appendix.js、Step3Appendix.vue
- 所属项目：苏州市房地产监测V3；来源会话：4b85e9a6-d8c8-452a-86e2-545a995afd8f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_attachment_guard",
  "source_extraction_id": "8298b83dd6b24dbbbfaf79725dcec981",
  "version": 2,
  "memory_type": "entities"
}
-->