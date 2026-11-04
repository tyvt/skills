# SelectEntryDialog 直接改 prop 致弹窗重开
苏州市房地产监测V3 中 SelectEntryDialog.vue 内部对 prop 直接赋值关闭弹窗，导致父组件状态不同步，列表页 re-render 时弹窗重开并重复请求。

## 根因
- SelectEntryDialog.vue 用 :visible.sync="visible" 关闭弹窗，visible 是 prop，handlePick 中 this.visible=false 直接改 prop 不通知父组件
- 父组件 showSelectEntryDialog 仍为 true（无 update:visible 事件）
- 列表页任意 re-render（点搜索 → handleQuery → getList → loading 变化）将子组件 prop 重置为 true → 弹窗重开 → watch visible 触发 getList() → 重复调用 selectableEntryPage

## 涉及文件
- SelectEntryDialog.vue、zhi2-web-admin/src/views/presale/leaseContract/components/SelectEntryDialog.vue、PropertyVerifyDialog.vue、listMixins.js、presale/leaseContract/index.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：c5c2d0c8-f7eb-434b-9656-71388be8c06d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_bug",
  "source_extraction_id": "420b7220f7dc4216a77d93e5c54337e6",
  "version": 1,
  "memory_type": "entities"
}
-->