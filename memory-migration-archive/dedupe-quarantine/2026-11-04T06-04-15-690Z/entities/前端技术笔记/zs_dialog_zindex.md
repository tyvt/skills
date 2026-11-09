# zs-dialog高z-index遮挡内部el-select
园区物管 zs-dialog 弹窗因高 z-index 遮挡内部下拉需修复。

## 问题根因
- `src/components/zs-dialog/zs-dialog.vue` 中 `.el-dialog__wrapper` 设 `z-index: 9999 !important`，Element UI 下拉层默认 z-index 较低被遮挡致选项不可见。

## 解决方案
- `parkingDialog.vue` 为 `el-select` 添加 `popper-class` 并通过非 scoped 样式将下拉层 `z-index` 提至 10050。
- 收费标准接口补全前导 `/` 并兼容 `res.rows || res.data`。

## 验证与归属
- 涉及文件：src/components/zs-dialog/zs-dialog.vue、parkingDialog.vue
- 来源会话：7fa31206-b0fe-47be-9388-3aedc6b7e8ed；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_dialog_zindex",
  "source_extraction_id": "521472eab75e4ad389f3eebfdb229651",
  "version": 1,
  "memory_type": "entities"
}
-->