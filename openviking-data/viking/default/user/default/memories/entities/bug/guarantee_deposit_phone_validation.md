# 房屋质量保证金协议-联系电话格式校验修复
榆林G 项目 zhi2-web-admin 中房屋质量保证金协议新增页，开发企业和物业服务企业联系电话字段缺少手机号格式校验，已修复。

## 根因分析
- contactPhone（开发企业）和 propertyContactPhone（物业服务企业）只配置了必填校验，未配置手机号格式校验
- constructionContactPhone（建设单位）已有格式校验，前两个字段缺失

## 修复内容
- 为 contactPhone 和 propertyContactPhone 补充与项目其他表单一致的格式校验，使用全局 patterns.contactPhone 正则：/^((0\d{2,3}-\d{7,8})|(\d{8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/
- 支持手机号（11 位，1 开头）、座机号（如 010-12345678）、8 位号码；非法格式如 1856300测试 会提示「请输入正确的手机号」，无法通过校验

## 涉及文件
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/company/companyManagement/components/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/patterns/index.js

## 验证与归属
- 验证证据：extracted source=cursor project=榆林G
- 所属项目：榆林G；来源会话：ea514d30-3de8-4e8a-beb7-f0690c0e8a2b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "guarantee_deposit_phone_validation",
  "source_extraction_id": "c539c692d3aa48b18b9fa399760cc81f",
  "version": 1,
  "memory_type": "entities"
}
-->