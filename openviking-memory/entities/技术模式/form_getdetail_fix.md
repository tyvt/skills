# QualificationFormSection 与 detailMixins 修复
苏州市房地产监测V3 项目修复子组件误调 getDetail() 导致 [getDetail] 缺少接口必需参数问题。

## QualificationFormSection.vue 改动
- 去掉 detailMixins，只保留 registerFormConsumerMixin
- 子组件不再监听 formMode、不再误调 getDetail()，也不再拉片区/街道/社区等无关接口
- initDict() / getDicts 不变（走 Vue.prototype.getDicts）

## detailMixins.js 改动
- init() 在缺少 moduleName、businessName、primaryKey 时直接返回，不再进入 getDetail()
- 已配置三字段的详情页逻辑不变；详情页配置错误时仍由 validateDetailRequiredParams 打 warn

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：register/components/QualificationFormSection.vue、mixins/detailMixins.js、mixins/form.js
- 所属项目：苏州市房地产监测V3；来源会话：5584ad88-6363-48c5-9d3d-5f769967f5f6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_getdetail_fix",
  "source_extraction_id": "690db916035b49d8a2baa74ec2c78899",
  "version": 1,
  "memory_type": "entities"
}
-->