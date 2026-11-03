# 物业管理区域选择器受端别限制隐藏
facility/index.vue 物业管理区域选择器受 isGTerminalLike 限制隐藏，物业企业管理员无法选择区域维护设备。
## 问题根因
- facility/index.vue 区域选择器受 isGTerminalLike 限制隐藏
- 物业企业管理员无区域选择入口，无法维护设备
## 解决方案
- 左侧始终显示区域输入框，区分用户类型
- 仅 B 端从业人员自动带入区域
## 验证与归属
- 验证：extracted source=cursor session=688fb713-99d8-4359-9f09-c52c2f5c589d
- 涉及文件：zhi2-web-admin/src/views/maintenance/facility/index.vue、facilityChange/index.vue、property/workOrder/order/index.vue、store/getters.js、store/modules/user.js、utils/terminalUser.js、utils/projectContext.js、home/bProjectDialog.vue
- 来源会话：688fb713-99d8-4359-9f09-c52c2f5c589d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_region_hidden",
  "source_extraction_id": "1f3d457236504fd2a187c4485380c4c8",
  "version": 1,
  "memory_type": "entities"
}
-->