# 楼盘表弹窗单元表头全选不回显修复
产品2.0 楼盘表 BuildingTable 弹窗带入已勾选数据时，单元表头 el-checkbox 因仅用 :value 绑定不刷新。
## 问题根因
- 弹窗打开时 tableData 已含勾选，但 el-checkbox 只用 `:value` 绑 `isUnitChecked`，视图不刷新。
- Element UI 的 el-checkbox 单独使用主要靠 v-model 更新显示，仅 :value 可能不刷新。
## 解决方案
- 改为 `v-model` 绑定独立响应式对象 `unitCheckState[unit.unitId]`。
- 用 `watch tableData`（deep + immediate）调用 `syncUnitCheckState()` 按 `isUnitChecked` 写回。
- 房屋 `checked` 同时认可 `=== 1` 与 `== '1'`，半选仍走 `indeterminate`。
## 验证与归属
- 验证：弹窗打开场景用户二次反馈未生效后按 data+watch 修复；会话结论确认 el-checkbox 需 v-model。
- 涉及文件：zhi2-web-admin/src/views/components/BuildingTable.vue；所属项目：2-0；来源会话：c16817a9-7cdf-427a-b135-24efd6fe2d95。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_check",
  "source_extraction_id": "aeb6021c119446819b122f4f280cd7ed",
  "version": 1,
  "memory_type": "entities"
}
-->