# 招标方案详情关联备案编号跳转
propertyTenderPlan/detail 抬头「关联招标备案编号」配置为可点链接，跳转 localPropertyBid 详情。

## 实现方式
- headTitleList 项 type:'link'，link 指向 methods 内 goToLocalPropertyBidDetail
- 方法内取 form.localPropertyBidId，空则 return，否则 router.push path 为 getRouterPathByFilePath('property/localPropertyBid/detail') + id，query 带 formMode:'view'
- 与 propertyBid 跳 complex 详情同一套 getRouterPathByFilePath + formMode 约定

## 验证与归属
- 验证：会话 9fc24659 中 propertyTenderPlan/detail 配置 winCode 展示项为可点链接
- 涉及文件：zhi2-web-admin/src/views/property/propertyTenderPlan/detail.vue、propertyBid/detail.vue
- 所属项目：2-0；来源会话ID：9fc24659-dae3-4dba-9cc3-f12e07ae4fca；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_tenderplan_link",
  "source_extraction_id": "7e05f1205910435fbbe5059959536467",
  "version": 1,
  "memory_type": "entities"
}
-->