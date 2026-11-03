# Navbar.vue
园区物管2.0 布局壳组件 zhi2-web-admin/src/layout/components/Navbar.vue。
## 已知问题
- 组件底部遗留一段面向 .el-dialog 的 `:deep(.el-dialog){position:fixed!important;top:80px!important;right:25px!important;...}` 全局弹窗定位样式（G/B 端拆分时为「项目选择弹窗」所加，弹窗挪到 layout/index.vue 后未清理），会污染其内部所有弹窗（如修改密码、关于系统弹窗不居中，被强制定位右上角）。
## 约定
- 布局壳（layout/Navbar 等）禁止留任何面向 .el-dialog 这类公共标签的 :deep 定位/尺寸覆盖；为特定弹窗定制位置必须加专用 class。
- 排查「弹窗位置不对」时先 grep 布局壳组件里的 `:deep(.el-dialog)` 残留，而非改弹窗本身。

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "Navbar.vue",
  "source_extraction_id": "bac00bb0f43c43b58b0b15478530d125",
  "version": 1,
  "memory_type": "entities"
}
-->