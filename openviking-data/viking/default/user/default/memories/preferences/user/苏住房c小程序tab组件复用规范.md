- 新增或改造带 Tab 的小程序页面，统一复用 @/components/commonNew/tabLine.vue（TabLine），显式传布局参数（对齐投票表决页用 align="space-around"），不自定义 Tab 样式
- 页面 scoped 样式中不要对 tabs 容器做侧边距、下划线、背景覆盖，视觉差异优先看 TabLine 暴露的 props 能否满足
- 定位同类 Tab 问题最快路径：找用户认可的同类页面（如 pages_vote/decision/index）整段搬其 Tab 实现，而非在自写样式上加选择器

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房C小程序Tab组件复用规范",
  "source_extraction_id": "3b9e083f125d45f880ff8ff4eadaf2e5",
  "version": 1,
  "memory_type": "preferences"
}
-->