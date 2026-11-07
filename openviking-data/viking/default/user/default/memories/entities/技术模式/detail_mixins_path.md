# detailMixins视图模式拼错详情请求路径
`detailMixins` 在 `formMode: 'view'` 时由 `init()` 按 `moduleName`+`businessName` 拼出不存在的 `/company/institutionRegister/detail`，需在 `detail.vue` 覆盖 `init()` 阻断自动请求。

## 问题根因
- `detailMixins` 在 `formMode: 'view'` 时由 `init()` 按 `moduleName`+`businessName` 拼出不存在的 `/company/institutionRegister/detail`

## 解决方案
- 在 `detail.vue` 覆盖 `init()` 阻断自动请求
- `created()` 中 `loadDetail()` 仍调用正确的 `/company/companyRegister/detail` 加载数据

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/001.md
- 涉及文件：src/api/company/institutionRegister.js、src/api/institution/institutionRegister.js、src/views/company/institutionRegister/detail.vue、src/views/institutionRegister/InstitutionRegisterPage.vue、src/mixins/detailMixins.js、src/mixins/form.js、src/views/zljg/institutionRegister/detail.vue、src/components/OperationBtnGroup/index.vue
- 来源会话ID：1412adc3-5a64-46ef-9d42-ab80e4e6c02f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_mixins_path",
  "source_extraction_id": "f69f45146b4e40659a242782010bccec",
  "version": 1,
  "memory_type": "entities"
}
-->