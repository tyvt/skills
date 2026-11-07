# 一般表决新增决策范围分流
太仓G 一般表决（`decision-policy="general"`）点击「+ 新增」须打开选择户室弹窗走 batchAdd，维修资金表决（maintain）保留原表单链路。

## 问题根因
- 从昆山等源站迁移时 DecisionRangeTable.vue 若一律用「新增决策范围」表单弹窗并调单条新增接口，一般表决会与正确产品行为不符并可能触发后端异常
- 左侧户室树「暂无数据」时另查 propertyProjectId 与树接口数据

## 解决方案
- 一般表决点击「+ 新增」打开 RangeHouseDialog「选择户室」，选中后调 batchAdd 批量写入并刷新列表
- 维修资金表决（maintain）仍保留原「新增决策范围」表单链路

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 0a72f656 用户对比昆山截图，太仓一般表决详情新增走错弹窗导致系统异常；结论引入 RangeHouseDialog + batchAdd 按 general/maintain 分支
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/DecisionRangeTable.vue、generalDecision/detail.vue、api/estate/decisionRange.js
- 所属项目：太仓G；来源会话：0a72f656-dc31-41e6-9305-4a7371db4213；代码基线：e083bd5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_branch",
  "source_extraction_id": "f34e3449713b413fb2df21abd5c1b15e",
  "version": 1,
  "memory_type": "entities"
}
-->