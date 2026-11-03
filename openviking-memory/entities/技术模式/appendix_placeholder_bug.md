# 占位分配拆散多文件要件致补充材料多图回显失败
苏州市房地产监测V3 前端因缺少 appendixConfigId 时占位分配拆散多文件要件，致 UI 仅显示单张图。

## 问题根因
- enrichUploadedList 在缺少 appendixConfigId 时通过 usedConfigIds 占位分配
- 拆散多文件要件致 UI 仅显示单张

## 关键修复
- appendix.js 的 flattenAppendixPackagesToUploadedList 按配置展平
- enrichRegisterUploadedList 去除占位并合并乐观项
- institutionRegister.js 与 companyRegister.js 分别调用 listInstitutionAppendixPackage 与 listAppendixPackageForRegister

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/103.md
- 涉及文件：Step3Appendix.vue、InstitutionUploadItem.vue、institutionRegister.js、companyRegister.js、InstitutionRegisterPage.vue、appendix-package-helpers.js
- 来源会话ID：b5012ad6-36f9-46ad-a9b1-913b5fdf7d66；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_placeholder_bug",
  "source_extraction_id": "0bc36deba868432392862204dc43a510",
  "version": 1,
  "memory_type": "entities"
}
-->