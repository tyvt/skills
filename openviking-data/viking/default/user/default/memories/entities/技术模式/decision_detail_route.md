# 业主表决情况表详情跳转主键分流
只读列表 decisionSituation 点查看按 decisionType 分流到不同表决详情路由，MULTIPLE_ISSUES 用 decisionManageId。

## 业务分流
- NORMAL → autonomy/general/detail，query 用 decisionId
- OPTION → autonomy/option/detail，decisionId
- SORT → autonomy/sort/detail，decisionId
- MULTIPLE_ISSUES → autonomy/multiply/detail，query 用 decisionManageId（多议题管理主键，与另三类不同）

## 实现要点
- 列表沿用 moduleName: 'autonomy' + businessName: 'decisionSituation' 调 POST page
- 字典与搜索项对齐 general/index.vue
- 后台需在 sys_menu 配 component autonomy/decisionSituation/index 及 list/query 权限

## 验证与归属
- 验证：会话 921980e6 最终结论第4点确认 MULTIPLE_ISSUES 带 decisionManageId，其余带 decisionId
- 涉及文件：zhi2-web-admin/src/views/autonomy/decisionSituation/index.vue、autonomy/general/index.vue、autonomy/multiply/detail.vue
- 所属项目：园区公共收益；来源会话：921980e6-6982-4e1b-8876-2014d4e01a3d；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_detail_route",
  "source_extraction_id": "d709eae86a0446e2bbf553bea5add833",
  "version": 1,
  "memory_type": "entities"
}
-->