# 企业入网详情资质附件缺ID兼容
苏州市房地产监测V3 中企业入网详情因缺失 companyId 导致资质要件不显示，已做兼容处理。

## 归一化兼容
- `companyRegister/detail.vue` 兼容 `data.companyRegister` 嵌套与旧字段
- `listAppendixPackage` 增加 `companyId: form.companyId || form.companyRegisterId`

## 查看态回退
- `AppendixPackageSection/index.vue` 查看态请求补充 `companyId`
- 回退 `resolvedBusId` 避免无 `companyId` 时查不到附件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/033.md
- 涉及文件：companyRecordAgency/change/detail.vue、companyManagement/change/detail.vue、develop/detail.vue、components/detail.vue、toB/change/detail.vue、toB/companyRecord/detail.vue、companyManagement/change/index.vue、DeveloperBasicInfoDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：cf99f29b-21f8-4a83-a521-70a8141c3d1f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_appendix_id",
  "source_extraction_id": "85ea740928034a10883a86b895152c50",
  "version": 1,
  "memory_type": "entities"
}
-->