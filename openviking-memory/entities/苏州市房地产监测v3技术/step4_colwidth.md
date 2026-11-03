# Step4股东表列宽紧凑优化
苏州市房地产监测V3 注册流程 Step4Shareholders.vue 调整股东表列宽与溢出提示以实现紧凑布局。

## 改动内容
- 序号列 width 由 96 改为 60
- 股东名称列 min-width 改为 width=140 并增加 show-overflow-tooltip
- 表格设置 :fit=false 以紧凑布局

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/163.md
- 涉及文件：Step4Shareholders.vue、companyRegister.vue、companyInfo.vue、registerValidate.js、Step1CompanyInfo.vue、Step3Appendix.vue、companyRegister.js、propertyCompanyRegister.vue
- 所属项目：苏州市房地产监测V3；来源会话：07ea18e2-6956-4c76-aee4-59cf48b781f9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "step4_colwidth",
  "source_extraction_id": "4ab1eb5ff2df476e89c5e40eba2a6f96",
  "version": 1,
  "memory_type": "entities"
}
-->