# 楼宇授权对话框样式未与 branch yuanqu 同步
当前分支上的 BuildingDialogAuth.vue 的布局和交互与 branch yuanqu 的标准不一致。

## 问题根因
- 当前分支上的 BuildingDialogAuth.vue 的布局和交互与 branch yuanqu 的标准不一致。

## 解决方案
- 与 commit cd9696539 同步。
- 修改底部确认按钮、文本传输按钮、已选分页、宽度 96vw、固定 8 行表格等。

## 验证与溯源
- 涉及文件: src/views/property/complexBuildingAuth/detail.vue; src/views/components/BuildingDialogAuth.vue; 当前分支的 BuildingDialogAuth.vue。
- 会话: dc881812-1513-477b-8342-59b5f3fc62ac; 基础代码: none.

<!-- MEMORY_FIELDS
{
  "category": "已知缺陷",
  "name": "building_auth_sync",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 1,
  "memory_type": "entities"
}
-->