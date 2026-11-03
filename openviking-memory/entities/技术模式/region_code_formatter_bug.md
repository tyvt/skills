# 所属区域编码未转名称致详情展示编码
苏州市房地产监测V3的项目交付模块中，ProjectDeliveryInfoPanel.vue 的 region 字段直接展示行政区划编码，未使用 provinceFormatter 转换。

## 问题根因
- ProjectDeliveryInfoPanel.vue 中 region 字段直接展示行政区划编码
- 未使用 `provinceFormatter` 进行转换，导致详情展示编码而非名称

## 解决方案
- 新增 `regionLabel` 计算属性调用 `formatters.provinceFormatter`
- 将 `regionLabel` 应用于详情与编辑表单

## 验证与归属
- 涉及文件：ProjectDeliveryInfoPanel.vue、projectDeliveryConstants.js、ProjectDeliveryDetail.vue、index.vue、detail-template.vue、listMixins.js、detailMixins.js、ruoyi.js
- 来源会话ID：189a9e5a-b1d3-44f4-a6ab-16d07c1529ef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_code_formatter_bug",
  "source_extraction_id": "99fa5352d8a04f5193fd2ce21a6dfcb0",
  "version": 1,
  "memory_type": "entities"
}
-->