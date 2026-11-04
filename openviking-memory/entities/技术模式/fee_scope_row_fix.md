# 欠费户室弹窗单选模式 row 未定义修复
选择欠费户室弹窗 feeBindScopeDialog.vue 单选模式 row 未定义导致确定按钮异常，已重构为楼幢树+列表/楼盘表 Tab 并修复 row。

## 问题根因
- 选择欠费户室弹窗 feeBindScopeDialog.vue 单选模式下 row 未定义，导致确定按钮逻辑异常

## 解决方案
- 弹窗重构为楼幢树 + 列表/楼盘表 Tab 模式，并修复 row 未定义
- 列表页 index.vue 移除 min-height:500px
- 详情页 feeBindScopeTable.vue 提示条改浅橙（#fff7e6 / #ffd591）、无 icon，按钮右对齐且文案改「导入上次申报数据」

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/feeDeclare2/index.vue 与 detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/feeDeclare2/components/feeBindScopeTable.vue 与 feeBindScopeDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/maintenance/components/ScopeSelectDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/benefit/bankDetailDay/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/syncObligee/components/selectRoomDialog.vue 与 property/components/feeBindScopeDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor session=b37d508c-a09b-4cbb-bac4-008c8f7645fb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_scope_row_fix",
  "source_extraction_id": "4ca9c539b6bc40068271fdd96394dd47",
  "version": 1,
  "memory_type": "entities"
}
-->