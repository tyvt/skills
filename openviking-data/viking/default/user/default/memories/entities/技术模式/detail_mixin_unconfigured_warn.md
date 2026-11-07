# 子组件未配参混入详情脚本误调接口告警
苏州市房地产监测V3 中 QualificationFormSection.vue 因混入 detailMixins 但未配置必要参数，误调 getDetail() 触发缺参告警。

## 问题根因
- QualificationFormSection.vue 混入 detailMixins 但未配置 moduleName、businessName、primaryKey
- 误调 getDetail() 触发缺参告警

## 关键修复
- 该组件移除 detailMixins，仅保留 registerFormConsumerMixin
- detailMixins.js 的 init() 在缺参时直接返回，不再进入 getDetail()

## 涉及文件
- src/views/register/components/QualificationFormSection.vue
- src/mixins/detailMixins.js、src/mixins/form.js
- src/views/register/components/Step1CompanyInfo.vue、src/utils/registerValidate.js
- src/views/company/companyManagement/components/DeveloperBasicInfoForm.vue
- src/utils/registerFormContext.js、src/mixins/formComponents.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/191.md
- 来源会话ID：5584ad88-6363-48c5-9d3d-5f769967f5f6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_mixin_unconfigured_warn",
  "source_extraction_id": "13504b4c3c2241668e70290aac1fe9c5",
  "version": 1,
  "memory_type": "entities"
}
-->