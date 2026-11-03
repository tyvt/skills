# headline_elrow_fix
Headline 组件内样式强制 .el-form 为 flex 布局干扰 el-row/el-col 栅格导致弹窗错位，需覆盖样式并调整断点。

## 问题根因
- Headline 组件样式强制 .el-form 为 display:flex;flex-wrap:wrap
- 干扰 el-row/el-col 布局，导致 ParkingAssetDialog 等四个弹窗错位

## 解决方案
- 将 ParkingAssetDialog 等四文件 el-col 断点改为 :sm="8" :md="8"
- 在 zs-dialog.vue 覆盖 Headline 表单样式修复布局

## 验证与归属
- 涉及文件：zs-dialog.vue 及四个弹窗文件（含 ParkingAssetDialog）
- 来源会话：97653fff-f2d2-435c-8326-b9e61dce841d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_elrow_fix",
  "source_extraction_id": "283032af46cb4317908e542b78aaeac1",
  "version": 1,
  "memory_type": "entities"
}
-->