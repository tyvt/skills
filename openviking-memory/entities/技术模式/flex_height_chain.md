# 缺少 flex 链导致面板间高度不一致
在查看模式下，缺少完整的 flex 样式链导致区域概览卡片无法跟随左侧表格的高度。

## 问题根因
- complexChange/detail.vue（查看模式）不具备完整的 flex 样式链。
- 右侧的区域概览卡片没有与左侧表格一起拉伸。

## 解决方案
- 添加诸如 basic-info-overview 的类。
- 父容器使用 align-items: stretch。
- 左侧的 detail-content 和右侧的 area-overview-wrapper 使用渐进式 flex: 1 来填充。

## 验证与来源
- 涉及文件: src/views/property/complexChange/detail.vue; src/views/property/complex/detail.vue; src/components/Headline/index.vue; src/components/detail-template/detail-template.vue.
- 会话: 1e61e3a9-dc70-4426-b664-29e85e61ae8d; 基础代码: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flex_height_chain",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 1,
  "memory_type": "entities"
}
-->