# Vite 构建误解析 slot 模板节点
产品2.0 中 `npm run build` 可能把带 slot 的模板节点误当 JS 模块解析，需改用函数式弹窗与 template 插槽。

## 问题根因
- `npm run build` 把模板里带 `slot` 的节点（如 `<div slot="footer">`、内嵌 `<zs-select-dialog>` 的 slot 子树）当成独立模块请求并错误当 JS 解析。
- 原因：slot 节点被错误提取。

## 解决方案
- 选择弹窗改用 `SelectDialog.open()` + `columns` 配置。
- footer 用 `<template #footer>`（或 `<template slot="footer">` 包裹）避免裸 div slot。
- 修正模板内明显语法错误（如 `"options": this.[...]`）。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：feeCustomTypeDialog、initiation/detail 等修完后 build exit 0。
- 涉及文件：zhi2-web-admin/src/views/maintenance/budget/components/feeCustomTypeDialog.vue、zhi2-web-admin/src/views/maintenance/final/components/feeCustomTypeDialog.vue、zhi2-web-admin/src/views/maintenance/initiation/detail.vue。
- 所属项目：2-0（产品2.0）；来源会话：69747f30-d768-4dea-bd2e-d230f2593e18；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_slot_parse",
  "source_extraction_id": "12e4b461564a49b89c97c402096a3c0d",
  "version": 1,
  "memory_type": "entities"
}
-->