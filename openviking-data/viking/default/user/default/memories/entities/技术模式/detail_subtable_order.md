# 详情页子表元素顺序规范
苏住房G 项目 V3 骨架 + zs-* 组件详情页内嵌子表须按「查询区 → 操作按钮区 → 表格 → 分页」四段顺序布局。

## 规则
- 子表组件模板严格按 搜索表单(zs-search-form) → 操作按钮区(ListOperationButtonContainer，含导出按钮) → 表格(zs-table) → 分页(zs-pagination) 顺序书写
- 操作按钮统一进入 ListOperationButtonContainer，不可与查询控件混排于同一行右侧
- 详情页 Tab/子表区须外层 Headline 包裹，与 notificationPublicity/detail.vue 保持一致
- 判断对齐不规范时直接找同模块已有详情页做参照，而非凭视觉调间距

## 验证与归属
- 涉及文件：property/complex/components/houseTable.vue、rangeTable.vue、complex/detail.vue
- 所属项目：苏住房G；来源会话：ab81a5b5-9545-4cc7-980f-d255d8453934；代码基线：5ccda28
- 用户判定导出按钮原与搜索表单并排「位置不对，应该在表格上面，参考框架规范」，已改为四段顺序

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_subtable_order",
  "source_extraction_id": "8ff983f008154129a5b3d61fe0701d5b",
  "version": 1,
  "memory_type": "entities"
}
-->