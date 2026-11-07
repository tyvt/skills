# 注册页标题偏移修复
苏州市房地产监测V3注册页因RegisterPageHeader与表单区版心不一致导致标题偏右，已通过CSS变量对齐修复。

## 问题根因
- RegisterPageHeader内层max-width:1200px，而表单区宽1400px致宽屏偏右
- 主标题未加分区标题padding-left:12px

## 修复方案
- RegisterPageHeader改用.register-wrap的CSS变量--register-content-max-width、--register-page-padding实现三页对齐

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：router/index.js、companyRegister.vue、institutionRegister/index.vue、leaseInstitutionRegister/index.vue、RegisterPageHeader/index.vue等
- 来源会话：d258d735-cf1c-4ea1-b3c3-bf1f9a80262c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "register_title_offset",
  "source_extraction_id": "48282b6d94f34f6a8a8894ba97586423",
  "version": 1,
  "memory_type": "entities"
}
-->