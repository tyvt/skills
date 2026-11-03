# 楼幢关联弹窗统一columns并兼容字段
园区公共收益项目(zhi2-web-admin)中 BuildingDialogAuth.vue 楼幢关联弹窗统一 columns 配置并兼容房屋套数字段。

## 改造要点
- BuildingDialogAuth.vue 统一 columns 配置并删除 rightColumns，兼容 totalHouse 与 houseNumber 房屋套数字段
- 查询参数移除 position 字段，双列表交互缩减为移入移出

## 涉及文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/property/complexBuildingAuth/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingDialogAuth.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-sort-dialog/zs-sort-dialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/SKILL.md

## 验证与归属
- 验证证据：src=园区公共收益/038.md
- 来源会话ID：61675c7d-cc31-40dd-b7a9-a334676d6bb6；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_dialog_columns",
  "source_extraction_id": "cc74d45141114b05b84f349e26a4345c",
  "version": 1,
  "memory_type": "entities"
}
-->