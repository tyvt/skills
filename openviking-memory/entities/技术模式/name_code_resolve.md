# 共管单位名称误赋编码未转名称修复
园区公共收益项目在监管协议详情中误将街道/社区编码直接赋给单位名称字段。

## 问题根因
- detail.vue 中 changeRegOrgType 直接将 subdistrict / community 编码赋给 regCompanyName，未转换为名称

## 解决方案
- 新增 resolveRegCompanyName 方法，调用 area mixin 的 subdistrictFormatter / communityFormatter 将编码转为名称
- 在选择及加载详情时调用 resolveRegCompanyName

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：src/views/benefit/pubRegulatoryAgreement/detail.vue、src/views/property/propertyAgreement/detail.vue、src/views/benefit/pubRegulatoryAccount/detail.vue、src/mixins/area.js、src/mixins/detailMixins.js、src/views/benefit/pubRegulatoryStopAgreement/detail.vue
- 所属项目：园区公共收益；来源会话：e570fc29-51f3-4efd-8ae2-538e3c48cc3c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "name_code_resolve",
  "source_extraction_id": "92149c6e2514408ab4051677278e5d51",
  "version": 1,
  "memory_type": "entities"
}
-->