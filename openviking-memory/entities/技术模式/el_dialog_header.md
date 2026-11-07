# Element Plus el-dialog 标题插槽须用 #header
Vue3 + Element Plus 迁移后 `el-dialog` 标题插槽名为 `#header`，须为直接子节点，不可嵌套或重复 `#title`。

## 问题根因
- Vue3 + Element Plus 中 `el-dialog` 标题插槽名为 `#header`，而非 Vue2/Element UI 习惯的 `#title`
- 具名插槽必须是 `el-dialog` 直接子节点；两个 `#title` 或把标题插槽包在 `.dialog-box` 等 div 内会触发 vite:vue 编译错误 "Codegen node is missing for element/if/for node"

## 解决方案
- 推荐结构：`<template #header>`（内可 `<slot name="title">` + attrs 兜底）+ 默认内容 div + `<template #footer>`
- 结论改为单一 `#header` 并去掉重复 `#title`
- 具体改法：`<template #header>` 内嵌 `<slot name="title">` 并保留 `{{ $attrs['header'] || $attrs['title'] }}` 默认内容

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 98fe164c 中 zs-dialog 报 Codegen node is missing，改为单一 #header 解决
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue；另见 @assets/views/login.vue、D:/repository/产品2.0/zhi2-web-admin/src/components/global-table-config/global-table-config.vue
- 验证证据补充：src=2-0/007.md
- 所属项目：2-0（园区物管2.0）；来源会话：98fe164c-3ca7-4574-8920-11075d32c5c9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_dialog_header",
  "source_extraction_id": "9b7970b9216d41dfac7377ac2dcc844d",
  "version": 2,
  "memory_type": "entities"
}
-->