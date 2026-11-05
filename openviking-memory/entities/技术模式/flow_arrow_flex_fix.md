# 门户首页流程箭头 flex 布局修复模式
门户项目 zhi2-web-admin 的 home/index-new.vue 中流程箭头间距修复，因 Vue2 编译器限制采用 display:contents 包裹。

## 问题根因
- Vue2 的 `vite:vue2` 编译器不允许在 `<template v-for>` 上写 `:key`，与 ESLint 对 Vue3 规则不一致。

## 解决方案
- 用带 `:key` 的 `.flow-step-group` 包住每一步
- 设置 `display: contents`，让内部 `.flow-step` 与 `.flow-arrow` 仍作为 `.flow-steps` 的直接 flex 子项参与排版
- 保存后 HMR 正常编译，刷新页面确认

## 涉及文件
- d:/repository/门户/zhi2-web-admin/src/views/home/index-new.vue

## 验证与归属
- 所属项目：门户；来源会话：90beac8b-1085-4755-9837-9d8a62c90937；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_arrow_flex_fix",
  "source_extraction_id": "26b930e378994743a28ddd22bfcec007",
  "version": 1,
  "memory_type": "entities"
}
-->