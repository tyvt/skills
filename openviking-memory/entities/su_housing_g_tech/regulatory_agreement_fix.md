# 阳光物业新增共管协议保存异常修复
苏住房G(zhi2-web-admin) 阳光物业协议管理新增共管协议保存时提示异常，根因是请求体存在空 ID / 中文名称当编码问题，已修复。

## 问题根因
- 请求体中 bankBranchManageId、regAccountID、regionCode、subdistrictCode、communityCode、workBankId、bankBranchManageName 等字段存在空 ID 或中文名称当编码问题，导致 For input string: "" 异常

## 修复内容
- getExtendedByComplexId 补齐区域、街道、社区编码
- propertyAccount 详情取值修正
- 字段核对：bankBranchManageId 已与网点列表 sysBankBranchId 匹配；regionCode=320506、subdistrictCode=320506004、communityCode=320506004006 均为数字编码（不再是中文名称）；bankBranchManageName 与俄罗斯清算行网点名称一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAgreement/index.vue、zhi2-web-admin/src/views/property/propertyAgreement/detail.vue
- 来源会话ID：a757e64c-cfe9-466d-8ab1-c7b2a7882f57

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "regulatory_agreement_fix",
  "source_extraction_id": "f6f0729ae96445aa9abdeb6bd96896bb",
  "version": 1,
  "memory_type": "entities"
}
-->