# 业委会选举申请楼幢勾选buildingIds格式修复
太仓G 业委会选举申请「选择户室」弹窗勾选左侧楼幢时报系统异常，因 buildingIds 被拼成字符串而非数组，已修复为传数组。

## 问题根因
- repairFunds/ownerApply/components/RangeHouseDialog.vue 中 `buildingIds: this.checkList.join(',')` 发送字符串如 "14587"
- 后端期望数组格式，因此报「系统异常，请联系管理员」

## 修复方案
- 与决策管理同名组件保持一致，直接传数组：`buildingIds: this.checkList` 发送 ["14587"]
- 重新编译或刷新页面后，列表可正常加载

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：repairFunds/ownerApply/components/RangeHouseDialog.vue、estate/optionDecision/components/RangeHouseDialog.vue、repairFunds/ownerApply/components/HouseholdDialog.vue
- 所属项目：太仓G；来源会话：285d96e1-2ba9-47f3-bae6-7acc747ce441；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_apply_buildingids",
  "source_extraction_id": "ac412ff13a2a482ea691d174b9542076",
  "version": 1,
  "memory_type": "entities"
}
-->