# splitBusinessFlowsForLayout 统一侧栏业务流横排
首页侧栏业务流布局抽成 splitBusinessFlowsForLayout，由 HomeLayoutSidebar、HomeLayoutAdmin 共用，统一分行/横排规则。

## 布局规则
- 有商品房板块权限时，首行单独放商品房，存量房/租赁等在下一行横排（双板块并存布局不变）
- 无商品房权限时，全部板块在同一行横排，恢复经纪侧栏约 1.8:1 的横排比例

## 验证与归属
- 验证证据：最终结论 MEDIUM「新增 splitBusinessFlowsForLayout 并在 HomeLayoutSidebar、HomeLayoutAdmin 共用」及两条分行/横排规则
- 涉及文件：zhi2-web-admin/src/views/home/config/homeLayout.js
- 所属项目：门户；来源会话：f7cb8b58-5877-4cf8-8d73-0c4b5bb0762a；代码基线：fd73e47

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_split_flows",
  "source_extraction_id": "8ea0a501af204a25846f3fa3289591f8",
  "version": 1,
  "memory_type": "entities"
}
-->