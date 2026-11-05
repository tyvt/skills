# 大屏穿透默认筛选未清除修复模式
园区物管2.0 大屏穿透到列表页时，若目标页有默认筛选项且大屏未传该参数，需清除默认筛选，否则列表数量与大屏不一致。

## 问题根因
- maintenanceProject/index.vue 默认 currentState='00'（当前节点=项目立项），大屏只传 bizState=2（已备案）时 listMixins 只写 URL 参数、未清默认，列表被额外按当前节点过滤，数量与大屏不一致

## 解决方案
- 目标页重写 applyScreenQuery()，调用原 mixin 后 this.$set(this.queryParams, 'currentState', undefined)，使 from=screen 时清默认
- 大屏入口：smartPropertyScreen/components/RepairFundRight.vue 的 goMenu('maintenance/maintenanceProject/index', buildScreenQuery({ bizState: 2 }, 'region'))

## 验证与归属
- 来源会话：2026-11-05 修复 bug 6220；文件 zhi2-web-admin/src/views/maintenance/maintenanceProject/index.vue；分支 develop/v2.6.2-yulin；提交 53a49c076

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "screen_drill_filter_clear",
  "source_extraction_id": "b03b5caf46e0410f892f1f3a0dcce3da",
  "version": 1,
  "memory_type": "entities"
}
-->