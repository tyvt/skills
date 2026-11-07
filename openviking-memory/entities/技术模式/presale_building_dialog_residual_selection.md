# 预售楼幢选择弹窗取消后残留选中状态
苏州市房地产监测V3 项目中修复 PresaleSelectBuildingDialog.vue 取消或关闭弹窗后残留选中状态的逻辑缺陷。

## 问题现象
- 改用 zs-select-dialog 后，本地 selection 仅在 handleConfirm 成功时清空
- 取消或关闭弹窗时 zs-select-dialog 会重置表格勾选但不会同步子组件状态
- 再次打开弹窗表格无勾选，但 selection 仍保留上次数据，导致「确定」可点且 handleConfirm 会提交过期楼幢及 _houseIds 载荷

## 根因
- 原先在 @opened 的 loadBuildings 中会执行 this.selection = []，重构删除该逻辑后未在 visible 打开/关闭时重置

## 涉及文件与归属
- zhi2-web-admin/src/views/presale/permit/components/PresaleSelectBuildingDialog.vue（393-415 行）
- 关联：PresaleBuildingTable.vue
- 所属项目：苏州市房地产监测V3；来源会话：b7de0fee-b743-4846-9174-5348514dc8db

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_building_dialog_residual_selection",
  "source_extraction_id": "6ae9df91bcf942f9a3361c899633d9bd",
  "version": 1,
  "memory_type": "entities"
}
-->
