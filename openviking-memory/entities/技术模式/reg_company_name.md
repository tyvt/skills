# 公共收益协议共管单位名称显示编码修复
园区公共收益项目中，公共收益协议详情选择共管单位后单位名称显示编码而非名称。

## 问题根因
- changeRegOrgType 方法直接把 subdistrict 或 community 的编码赋给 regCompanyName
- 未转换成对应的名称

## 修复方案
- 新增 resolveRegCompanyName 方法，根据类型用 subdistrictFormatter/communityFormatter 转名称
- 选择共管单位时 changeRegOrgType 调用该方法
- 加载详情时 getDetail 中同样调用

## 涉及文件与归属
- 涉及文件：src/views/benefit/pubRegulatoryAgreement/detail.vue、src/views/benefit/pubRegulatoryStopAgreement/detail.vue、src/views/property/propertyAgreement/detail.vue
- 所属项目：园区公共收益
- 来源会话：e570fc29-51f3-4efd-8ae2-538e3c48cc3c
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reg_company_name",
  "source_extraction_id": "79cc694f12bc4bf391a9c1460e65a168",
  "version": 1,
  "memory_type": "entities"
}
-->