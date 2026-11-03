# 操作指引列式白卡间距修复
OperationGuideBody 等列式面板在 is-columns 下 gap 设为 0 会导致多张白底卡片视觉连成一块，需按设计稿实测间距修正。

## 问题根因
- .og-panel-cards.is-columns { gap: 0 } 使多张白底卡片无缝拼接，看起来像单块白区

## 解决方案
- 按本页设计稿实测卡片间距（约 22–37px），与同文件 stack 布局已有间距对齐，统一 gap:26px
- 改为 gap:26px 后三块白卡分离，17 个视觉用例通过

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue
- 所属项目：门户；来源会话：session_c415e28d93e133b66067f38564803a54；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_og_gap",
  "source_extraction_id": "8ea0a501af204a25846f3fa3289591f8",
  "version": 1,
  "memory_type": "entities"
}
-->