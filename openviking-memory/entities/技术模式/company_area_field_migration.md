# 企业备案详情行政区域字段迁移
苏州市房地产监测V3 按 /company/companyRecord/detail 接口变更，将前端行政区域字段从 provinceCityArea 迁移为 administrativeArea。

## 修改内容
- companyRecord.js：getCompanyRecordDetail 注释注明返回字段使用 administrativeArea，不再使用 provinceCityArea
- CompanyBasicInfoForm.vue：表单绑定与展示改为 administrativeArea；查看模式通过 administrativeAreaValue 兼容旧数据
- companyBasicInfoContent.js：默认值 provinceCityArea→administrativeArea；新增 normalizeCompanyBasicForm() 将旧字段映射到新字段；查看模板使用 administrativeArea 展示
- companyCancel/detail.vue：加载数据时调用 normalize 函数完成字段迁移

## 涉及文件
- companyRecord.js
- CompanyBasicInfoForm.vue
- companyBasicInfoContent.js
- companyCancel/detail.vue

## 验证与归属
- 字典使用 ECONOMIC_INSTITUTIONS_REGION
- 所属项目：苏州市房地产监测V3；来源会话：c41f1e6e-6285-4e62-b90d-cf6473627bf9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_area_field_migration",
  "source_extraction_id": "dfa75a1a33464c4a91b18744ec547ae7",
  "version": 1,
  "memory_type": "entities"
}
-->