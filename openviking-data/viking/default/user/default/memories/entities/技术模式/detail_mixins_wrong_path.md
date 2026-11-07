# detailMixins 拼接错误路径导致错误请求
在 Suzhou Real Estate Monitoring V3 项目中，`detailMixins` 在 `formMode:'view'` 下通过 `moduleName+businessName` 拼接了错误路径 `/company/institutionRegister/detail`，导致详情请求了错误的 API。

## 症状
- `detailMixins` 在 `formMode:'view'` 下的 `init()` 拼接了错误路径 `/company/institutionRegister/detail`

## 解决方案
- `detail.vue` 重写 `init()` 以避免自动请求
- 在 `created()` 中保持 `loadDetail()` 调用 `/company/companyRegister/detail`
- 诸如 `zljg` 的包装页面共享该效果

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：1412adc3-5a64-46ef-9d42-ab80e4e6c02f
- 验证证据: src=苏州市房地产监测V3/181.md
- 涉及文件: api/company/institutionRegister.js, api/institution/institutionRegister.js, company/institutionRegister/detail.vue, institutionRegister/InstitutionRegisterPage.vue, mixins/detailMixins.js, mixins/form.js, zljg/institutionRegister/detail.vue, OperationBtnGroup/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 1412adc3-5a64-46ef-9d42-ab80e4e6c02f; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "detail_mixins_wrong_path",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 2,
  "memory_type": "entities"
}
-->