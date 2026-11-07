# Detail.vue 中注册但未使用的组件缺陷
在项目 Suzhou Real Estate Monitoring V3 中，companyAdmin/detail.vue 在 components 中注册了 RegisterUploadItem 但未导入它，且模板未使用它，导致引用错误。

## 问题根因
- companyAdmin/detail.vue 在 components 中注册了 RegisterUploadItem 但未导入
- 模板未使用该组件，冗余注册导致引用错误

## 修复
- 移除了 RegisterUploadItem 的冗余注册
- 必要的上传改为由 AppendixPackageSection 处理以恢复路由

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/023.md
- 涉及文件: companyAdmin/detail.vue, agency/detail.vue, certLic/consLic/detail.vue, register-form.scss, zs-select-dialog.vue, DeveloperBasicInfoDetail.vue, index.scss, companyAdmin/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; session: 0cdbc4de-abdb-4fc7-8b12-467375ea1019; 代码库: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：0cdbc4de-abdb-4fc7-8b12-467375ea1019


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "detail_unregister_component",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 4,
  "memory_type": "entities"
}
-->
