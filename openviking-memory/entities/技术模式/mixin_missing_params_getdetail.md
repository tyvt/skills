# 无参数 Mixin 对 getDetail 的错误调用
在 Suzhou Real Estate Monitoring V3 项目中，`QualificationFormSection.vue` 使用了不带 `moduleName` 的 `detailMixins`，导致 `init()` 在错误的接口上调用了 `getDetail()`。

## 问题根因
- `QualificationFormSection.vue` 错误地使用了不带 `moduleName` 参数的 `detailMixins`
- mixin 的 `init()` 因缺少参数而对异常接口调用了 `getDetail()`

## 解决方案
- 从组件中移除了 `detailMixins`，仅保留了 `registerFormConsumerMixin`
- `detailMixins.js` 使 `init()` 在缺少参数时直接返回
- `validateDetailRequiredParams` 对缺失的参数发出 `warn` 警告

## 验证与归因
- 验证证据: src=苏州市房地产监测V3-rest/151.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: QualificationFormSection.vue, detailMixins.js, form.js, Step1CompanyInfo.vue, registerValidate.js, DeveloperBasicInfoForm.vue, registerFormContext.js, formComponents.js
- 会话: 5584ad88-6363-48c5-9d3d-5f769967f5f6; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "mixin_missing_params_getdetail",
  "source_extraction_id": "21ad71f1e972470cb366751ddbf5140c",
  "version": 1,
  "memory_type": "entities"
}
-->