# 企业入网详情资质与要件显示修复
苏州市房地产监测V3 中企业注册/变更详情页修复资质信息不显示与要件加载失败问题，统一 companyId 取数逻辑。

## 企业注册审核
- `companyRegister/detail.vue` 详情归一化兼容 `data.companyRegister` 嵌套
- `qualificationList` 支持根级数组与 `migrateLegacyQualificationForm` 旧字段
- `listAppendixPackage` 增加 `companyId: form.companyId || form.companyRegisterId`，与 `AnnexUpload` 一致

## 共用要件组件
- `AppendixPackageSection/index.vue` 查看态请求补充 `companyId` 回退为 `resolvedBusId`，避免无 `companyId` 时查不到附件

## 企业变更详情
- `DeveloperBasicInfoForm.vue`、`toB/companyRecord/detail.vue` 与截图布局一致修复要件显示

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyRegister/detail.vue`、`AppendixPackageSection/index.vue`、`DeveloperBasicInfoForm.vue`、`toB/companyRecord/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：cf99f29b-21f8-4a83-a521-70a8141c3d1f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_fix",
  "source_extraction_id": "cef2b075f6c0442896293524a42a0f30",
  "version": 1,
  "memory_type": "entities"
}
-->