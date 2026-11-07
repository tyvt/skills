# zs-select-dialog selectable 声明冲突修复
产品2.0（zhi2-web-admin）中 zs-select-dialog.vue 因同时存在 prop 与 data 的同名 selectable 导致 Vue 警告，已通过替换 mixin 修复。

## 问题原因
- zs-select-dialog.vue 同时存在两处 selectable 声明：prop（函数类型，控制行是否可选）与 data（来自 @/mixins/table 的布尔值，表示是否显示多选列）。
- Vue 不允许同名 prop 与 data，因此出现 Vue warn 警告。

## 修复方式
- 将 mixins: [table] 改为 mixins: [tableComponents]。
- tableComponents 只注册 zs-table、zs-select-column 等组件，不包含 selectable 等 data；组件自身已实现列表查询、选择逻辑，不需完整 table mixin。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：刷新页面后打开「新增报事工单」物业管理区域选择弹窗，警告不再出现。
- 涉及文件：zs-select-dialog.vue、mixins/table.js、views/property/workOrder/report/components/AddOrderDialog.vue 等（路径前缀 d:/repository/产品2.0/zhi2-web-admin/src）。
- 所属项目：产品2.0；来源会话：09ed34db-94d4-41c6-856b-023f0668f865；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "dialog_selectable_fix",
  "source_extraction_id": "ca8df38d951f447aa2e165a2d2c0fccf",
  "version": 1,
  "memory_type": "entities"
}
-->