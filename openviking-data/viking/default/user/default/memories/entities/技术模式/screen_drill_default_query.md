# 大屏穿透默认筛选未清除（Bug 6220 变体）
园区物管2.0 大屏穿透到列表页时，目标页既有默认 queryParams 未被清除，导致列表额外叠加默认筛选、数量与大屏不一致。
## 问题根因
- 目标页本身有默认 queryParams（如 maintenanceProject/index.vue 默认 currentState='00' 即当前节点=项目立项）。
- 大屏穿透只传 bizState=2（已备案）时，listMixins 只写入 URL 参数、未清除页面默认 currentState，列表被额外按当前节点过滤。
- 期望行为（禅道 bug 6220）：大屏维修项目穿透应只按已备案筛选，不带上当前节点默认筛选。
## 解决方案
- 目标页重写 applyScreenQuery()，调用原 mixin 逻辑后 this.$set(this.queryParams, 'currentState', undefined)，使 from=screen 时清掉默认节点筛选。
- 大屏侧入口：smartPropertyScreen/components/RepairFundRight.vue 的 goMenu('maintenance/maintenanceProject/index', buildScreenQuery({ bizState: 2 }, 'region'))。
## 验证与归属
- 来源会话：2026-11-05 修复 bug 6220；文件 zhi2-web-admin/src/views/maintenance/maintenanceProject/index.vue；分支 develop/v2.6.2-yulin；提交 53a49c076。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "screen_drill_default_query",
  "source_extraction_id": "5588aafc654f41eabeb1a56ff7d1a4d4",
  "version": 1,
  "memory_type": "entities"
}
-->