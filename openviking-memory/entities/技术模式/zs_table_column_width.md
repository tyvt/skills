# zs-table-column 测宽自适应列宽
zs-table-column 按 canvas 测宽：<280px 输出固定 width，否则输出 min-width 作弹性列，页面层不写列宽。

## 实现规则
- 测算结果 < SHORT_COLUMN_FIX_THRESHOLD（门户首页待办改造时为 280px）时输出固定 `width`，不参与 zs-table `fit` 的剩余宽度放大
- 测算较大（主题/任务名等，上限仍 500）时输出 `min-width` 作为弹性列吸收剩余宽度
- 页面层（如 HomeTodoTable）应去掉列上的 width/min-width，操作列交给 zs-operate-column 按按钮文案测算

## 调整原则
- 微调分配效果优先改公共组件阈值，不要在业务页再写列宽

## 验证与归属
- 验证证据：用户要求「不要写任何宽度，直接组件内部计算」；最终实现为 zs-table-column 增强 + HomeTodoTable 去掉全部列宽
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeTodoTable.vue、zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/components/zs-table/zs-table.vue
- 所属项目：门户；来源会话：fd264e18-0e1a-4414-bf35-742d17d79c11；代码基线：b84b4e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_width",
  "source_extraction_id": "53c603737d434329a97690f706a618f0",
  "version": 1,
  "memory_type": "entities"
}
-->