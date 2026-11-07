# 证书管理新增按钮移入 Headline 右侧插槽
苏州市房地产监测V3 中 `ProjectCertificateTabs.vue` 的「证书管理-新增」按钮由 Headline 默认插槽移至 `right` 具名插槽，对齐宗地信息区块布局。

## 问题根因
- 「新增」按钮原写在 Headline 默认插槽的普通 div 内，渲染到标题下方正文区；Headline 组件提供 `right` 具名插槽（`src/components/Headline/index.vue:16`）用于标题栏右侧按钮

## 修改内容
- `src/views/projectManagement/customerProject/components/ProjectCertificateTabs.vue`：将「新增」按钮包进 `<template slot="right">`，移到标题行右侧
- 删除不再需要的 `.union-cert-toolbar` 包裹 div 及其 `margin-bottom: 12px` 样式

## 验证与归属
- 刷新页面后按钮显示在「证书管理」标题同一行右侧
- 所属项目：苏州市房地产监测V3；来源会话ID：c6201de8-0a18-4650-99df-c46d8250f432；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_cert_tabs_button_slot",
  "source_extraction_id": "37bad7824c0e47148de04351dc784be5",
  "version": 1,
  "memory_type": "entities"
}
-->