# 业务中心 flow-grid 空 steps 导致标签错行
门户首页 index-new.vue 业务流区 .flow-grid 为 grid-template-columns: 176px 1fr，空 steps 板块会让下一板块 label 挤入同行第二列造成错行。

## 问题根因
- .flow-grid 用 grid-template-columns: 176px 1fr 两列布局
- 模板先渲染 flow-label，flow-steps 用 v-if="flow.steps.length"
- 板块显隐由 portal:bizSection:{functionCode} 权限过滤，不保证 children 非空
- 已授权但 steps 为空的板块仅 1 个 grid 单元，下一板块 label 挤到第二列后错行

## 修复方向
- 数据层过滤 flow.steps.length > 0 再渲染
- 或用 display:contents 的 .flow-row 包住 label+steps
- 或无 steps 时连 label 一并 v-if 隐藏/渲染占位 grid-column: span 2

## 验证与归属
- 验证证据：Vue 审查 16–22 行 v-for 与 v-if 组合 + 325–326 行仅按权限 filter 未保证 steps
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话ID：f116a45f-2a58-4f45-b579-f37aae7508dd；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_grid_steps",
  "source_extraction_id": "d5288c49d81f4413bc5e4aeaa9a95188",
  "version": 1,
  "memory_type": "entities"
}
-->