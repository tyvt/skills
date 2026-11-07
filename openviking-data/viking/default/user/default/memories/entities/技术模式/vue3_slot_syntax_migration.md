# 产品2.0插槽语法迁移：Vue2 slot 改为 Vue3 #
产品2.0前端全局将旧插槽语法改为 Vue3 新写法。

## 迁移要点
- 表格相关组件 `zs-table-column`、`zs-operate-column` 等改为 `#header` / `#default` 新语法，修正下拉菜单 `dropdown` 插槽写法。
- 对话框 footer：示例 `WdmcDialog.vue` 从 `<div slot="footer">` 改为 `<template #footer>...</template>`。
- 后续按此模式批量修改其它带 `slot="footer"` 的对话框、表格、树节点等文件。

## 涉及文件
- zhi2-web-admin/src/components/zs-table-column.vue
- WdmcDialog.vue（属 zhi2-web-admin）
- runtime-core.esm-bundler.js（报错来源）

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0；来源会话ID：56daed33-b372-4f48-a73c-1d78207c080e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_slot_syntax_migration",
  "source_extraction_id": "bd566589708446009d22ce7852b518b2",
  "version": 1,
  "memory_type": "entities"
}
-->