# AppendixEmpty 错误引用导致 Vite 报错
`conLandLic/detail.vue` 和 `changeDetail.vue` 导入了不存在的 `@/components/AnnexUpload/components/AppendixEmpty.vue`（实际：`@/components/AppendixEmpty/index.vue`）；`AppendixPackageSection/index.vue` 未注册 `AppendixEmpty`。

## 修正
- 修正导入路径并在 `AppendixPackageSection/index.vue` 中注册 `AppendixEmpty`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：3e018025-42b0-4579-8189-908990fe5d69
- 验证证据: src=苏州市房地产监测V3/267.md
- 涉及文件: conLandLic/detail.vue, conLandLic/changeDetail.vue, AppendixPackageSection/index.vue, AppendixEmpty/index.vue, presale/surveyChange/detail.vue, presale/permitCancel/detail.vue, company/companyAdmin/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 3e018025-42b0-4579-8189-908990fe5d69; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_empty_misref",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 1,
  "memory_type": "entities"
}
-->