# 产品2.0单元表头选中状态修复：v-model+watch同步
产品2.0前端 BuildingTable.vue 中，单元全选时表头复选框不显示选中，已修复。

## 修复要点
- 单元表头 `el-checkbox` 改用 `v-model="unitCheckState[unit.unitId]"` 绑定，而非仅 `:value`，确保视图刷新。
- 在 `data()` 增加 `unitCheckState: {}` 存储每个单元选中状态。
- 用 `watch` 监听 `tableData`（`deep:true, immediate:true`），弹窗打开时立即根据 `checked` 计算各单元全选状态并写入。
- 同步逻辑在方法 `syncUnitCheckState()` 中遍历 units 计算。
- TypeScript 对 Vue2 选项式 API 推断报错不影响运行，方法已定义。

## 涉及文件
- zhi2-web-admin/src/views/components/BuildingTable.vue

## 验证与归属
- 所属项目：2-0；来源会话ID：c16817a9-7cdf-427a-b135-24efd6fe2d95
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_checkbox_vmodel_watch",
  "source_extraction_id": "bd566589708446009d22ce7852b518b2",
  "version": 1,
  "memory_type": "entities"
}
-->