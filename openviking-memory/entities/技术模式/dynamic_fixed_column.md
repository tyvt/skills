# Tab切换动态插入fixed列致表体空白
太仓G端选项表决详情切换 Tab 时动态渲染 fixed 操作列触发 Element UI 表格已知问题，表体不渲染但分页有总数。

## 问题根因
- 从「基本信息」切到「投票信息」时 `showSearch` 为 true 动态渲染 `fixed="right"` 操作列
- `type="selection"` 的 `:selectable` 误传布尔而非函数
- 切换 Tab 时残留 voteWay/voteState 等筛选

## 修复方案
- 避免动态加 fixed 列（去掉 fixed 或列结构常驻）
- `:selectable` 必须传函数；数据加载与 Tab 切换后 nextTick 调表格 `doLayout()`
- 切换 Tab 时清掉残留筛选

## 验证与归属
- 验证证据：会话 c17819e8 用户两次反馈切换 tag 数据不显示；改 optionDecision/DecisionRangeTable 与 detail Tab 后 doLayout
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/components/DecisionRangeTable.vue、optionDecision/detail.vue、components/zsTable/index.vue
- 所属项目：太仓G；来源会话：c17819e8-f61e-40ed-99cc-c04ba5efd9a5；代码基线：2ded8f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dynamic_fixed_column",
  "source_extraction_id": "ee62528ea6844ee48025867c5031521c",
  "version": 1,
  "memory_type": "entities"
}
-->