# 占位符将附件拆分为单张图片
在项目 苏州市房地产监测V3 中，`appendix.js` 中的 `enrichRegisterUploadedList` 在缺少 `appendixConfigId` 时使用 `usedConfigIds` 作为占位符，将多文件附件拆分为单张图片。

## 问题根因
- `appendix.js` 中的 `enrichRegisterUploadedList` 在缺少 `appendixConfigId` 时使用 `usedConfigIds` 作为占位符
- 导致多文件附件以单张图片形式展示

## 解决方案
- 替换为 `flattenAppendixPackagesToUploadedList` 以按配置扁平化并移除占位符
- 与 `listInstitutionAppendixPackage` 集成以展示多张图片

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/051.md
- 涉及文件: 前端技术信息.md, Step3Appendix.vue, InstitutionUploadItem.vue, company/institutionRegister.js, institution/institutionRegister.js, InstitutionRegisterPage.vue, register/components/Step3Appendix.vue, e2e/fixtures/appendix-package-helpers.js
- 所属项目: 苏州市房地产监测V3; 会话: b5012ad6-36f9-46ad-a9b1-913b5fdf7d66; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_upload_placeholder",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->