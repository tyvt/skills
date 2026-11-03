# 配套用房改名删设施须改详情页防回写
苏州市房地产监测V3 前端配套用房命名已统一，删除「封闭设施」须同步修改详情页并防范 detailMixins 回写残留字段。

## 背景
- 前端配套用房命名已统一（仓库无"小区"前缀）
- 侧栏旧名源于后台菜单

## 关键修复
- 删除「封闭设施」须修改 auxiliaryProject/detail.vue 移除表单及 facilityInfo
- 防范 detailMixins 随 form 回写残留字段
- 必要时前端保存前剔除或后端放宽校验

## 涉及文件
- src/views/projectManagement/auxiliaryProject/detail.vue、index.vue
- src/views/projectManagement/auxiliaryProject/components/houseTable.vue、houseDialog.vue
- 路由信息.json

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/191.md
- 来源会话ID：0fcad87d-b6db-4906-a704-25d2a6908a00
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auxiliary_project_facility_cleanup",
  "source_extraction_id": "13504b4c3c2241668e70290aac1fe9c5",
  "version": 1,
  "memory_type": "entities"
}
-->