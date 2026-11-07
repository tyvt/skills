# 决策管理选择户室buildingIds数组格式修复
太仓G 决策管理「选择户室」弹窗在 RangeHouseDialog.vue 的 getRightList 方法中将 buildingIds 拼成字符串，后端期望数组，已修复老 bug。

## 问题根因
- estate/optionDecision/components/RangeHouseDialog.vue 的 getRightList 方法中 `buildingIds: this.checkList.join(',')` 拼成字符串如 "14587,20950"
- 后端期望数组格式导致接口异常

## 修复方案
- 改为直接传 `this.checkList`：`buildingIds: this.checkList`
- repairFunds/ownerApply/components/RangeHouseDialog.vue 也有相同 join(',') 写法，如报错可一并修改

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证：刷新页面后多选楼栋，请求体变为 `buildingIds: ["14587", "20950"]`，接口正常返回户室列表
- 涉及文件：estate/optionDecision/components/RangeHouseDialog.vue、repairFunds/ownerApply/components/RangeHouseDialog.vue
- 所属项目：太仓G；来源会话：ed5871e8-b674-4437-be6c-e81ab129b3ce；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_range_buildingids",
  "source_extraction_id": "ac412ff13a2a482ea691d174b9542076",
  "version": 1,
  "memory_type": "entities"
}
-->