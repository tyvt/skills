# 待办面板演示数据未区分占位
苏住房G 首页V2待办面板在条数不足时用DEMO_ROW补满且无可区分样式，导致用户误读为真实业务数据。
## 问题根因
- home/v2/components/TodoPanel.vue 在待办不足4条时用 DEMO_ROW 假数据补满，行样式与文案与真实待办一致。
- 同项目 StudyPanel 有 is-placeholder 样式区分，TodoPanel 漏加，导致两块面板口径不一致。
- 根因为满足设计稿固定4行高度视觉，用演示数据填充空位但未做占位标识。
## 解决方案
- 占位数据二选一：骨架屏/灰块不渲染真实字段，或保留行结构加统一 is-placeholder 类（灰字/虚线边）并改文案为「暂无待办」类非业务文案。
- 多面板同页时占位样式收口到同一类名约定，新增面板直接复用。
## 验证与归属
- 验证证据：TodoPanel.vue:109-116 待办tab下列表不足4条用DEMO_ROW补满，文案像真实业务数据；StudyPanel有is-placeholder，TodoPanel无。
- 涉及文件：zhi2-web-admin/src/views/home/v2/components/TodoPanel.vue、StudyPanel.vue
- 所属项目：苏住房G；来源会话ID：22db11e4-4ebb-4504-8a6e-e93aa9791182；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_demo_placeholder",
  "source_extraction_id": "78a06fbd1aec4ffab8656af93c6d4aae",
  "version": 1,
  "memory_type": "entities"
}
-->