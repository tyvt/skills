# 房屋质量保证金协议-物业服务企业选择弹窗修复
榆林G 项目 zhi2-web-admin 中房屋质量保证金协议新增页，物业服务企业选择弹窗曾因机构类型错误无法选择，已修复并实现按合同自动带出。

## 根因分析
- 物业服务企业选择弹窗使用错误机构类型 organType: '03'（会计机构），正确应为 '02'（物业服务企业），导致弹窗列表始终为空

## 修复内容
- 手动选择：弹窗 organType 从 '03' 改为 '02'，可正常查询并选择物业公司
- 有合同时自动带出：选择物业管理区域后调用 /property/propertyContract/getByComplexId/{complexId} 查询该区域物业合同，自动填充企业名称、统一社会信用代码、联系人、联系电话，字段置只读避免误改
- 无合同时手动选择：仍可打开选择弹窗手动选择物业公司，并保留从 /maintenance/propertyProject/companyInfo 获取关联物业公司的兜底逻辑

## 涉及文件
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/petition/petition/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/initiation/detail.vue

## 验证与归属
- 所属项目：榆林G；来源会话：a8ef8efd-ce98-4799-a804-7ad84b70236e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "guarantee_deposit_org_select",
  "source_extraction_id": "c539c692d3aa48b18b9fa399760cc81f",
  "version": 1,
  "memory_type": "entities"
}
-->