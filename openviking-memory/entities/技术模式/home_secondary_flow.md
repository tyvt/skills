# 首页次要业务行按 functionCode 加宽
HomeLayoutAdmin 次要板块行用 nth-child(1/2) 分配 flex 在三列场景会不一致，需统一 flex 并仅对特定 functionCode 加宽类。

## 问题根因
- HomeLayoutAdmin 次要板块行 secondaryFlows 用 v-for 渲染，仅用 .biz-flow-secondary:nth-child(1/2) 分配 flex 1.8/1
- 第三个子项仍走默认 flex:0 1 auto，在「存量房+经纪机构+住房租赁」三列时后两列宽度不一致

## 修复方向
- 所有次要项统一 .biz-flow-secondary { flex: 1 1 0 }
- 仅 secondHandHouseTrade（或从 homeLayout 导出常量）加 biz-flow-secondary--wide（flex:1.8 1 0）
- 不依赖 API 返回顺序
- 姊妹布局 HomeLayoutSidebar 若仍用 nth-child 会复现且不一致，应抽共享 secondaryFlowClass

## 验证与归属
- 验证证据：会话 62d59697 第三子项等分问题与 functionCode 方案；[MEDIUM] Sidebar 仍用 nth-child
- 涉及文件：zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue；HomeLayoutSidebar.vue；zhi2-web-admin/src/views/home/config/homeLayout.js
- 所属项目：门户；来源会话ID：62d59697-f950-4230-8eac-39dd5d3f77ff；代码基线：门户 zhi2-web-admin @ f489349（2026-10-23）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_secondary_flow",
  "source_extraction_id": "53b97c16cee14d85a13ad8202c60d342",
  "version": 1,
  "memory_type": "entities"
}
-->