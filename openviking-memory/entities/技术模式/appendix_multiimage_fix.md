# 其它补充材料多图回显修复
苏州市房地产监测V3 修复 enrichUploadedList 占位分配导致多文件要件被拆散仅显示一张的问题。

## 根因
- enrichUploadedList 在简化列表缺少 appendixConfigId 时用 usedConfigIds 把每条附件占一个不同配置，多文件要件（其它补充材料）被拆散，UI 只显示 1 张，服务端仍计满额

## 改动
- appendix.js：flattenAppendixPackagesToUploadedList 从 listAppendixPackage 按配置展平列表；enrichRegisterUploadedList 仅按 id/code 补全，去掉占位分配，合并服务端未返回本地乐观项
- API：新增 listInstitutionAppendixPackage (institutionRegister.js)、listAppendixPackageForRegister (companyRegister.js)
- Step3 相关调整

## 涉及文件
- zhi2-web-admin/src/utils/appendix.js
- zhi2-web-admin/src/api/institution/institutionRegister.js
- zhi2-web-admin/src/api/company/companyRegister.js
- zhi2-web-admin/e2e/company/institution-register-flow.spec.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：b5012ad6-36f9-46ad-a9b1-913b5fdf7d66
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_multiimage_fix",
  "source_extraction_id": "0e3ce808053c40fd9e9a60c5229563fe",
  "version": 1,
  "memory_type": "entities"
}
-->