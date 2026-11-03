# 抽取专家详情备注置底与记录数显示
园区物管2.0 中 credit/extract/detail.vue 等页面使用 DetailTemplate 蓝框且备注置底，表格底部显示记录数。

## 实现要点
- credit/extract/detail.vue 查看模式用 DetailTemplate 蓝框，备注字段置底；编辑模式备注同移
- BlockExpertTable.vue 与 ExpertResultTable.vue 底部增 `共 XX 条记录`
- property/extract/detail.vue 同步备注位置调整
- 涉及 detail-template.vue 组件

## 涉及文件
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/credit/extract/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/credit/extract/components/BlockExpertTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/credit/extract/components/ExpertResultTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/evaluation/companyReport/components/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/extract/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/extract/components/BlockExpertTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/extract/components/ExpertResultTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/components/detail-template/detail-template.vue

## 验证与归属
- 来源会话：87a99be6-6232-4f70-af80-05cf6659e728
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "extract_remark_record",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 2,
  "memory_type": "entities"
}
-->