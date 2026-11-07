# ListTemplate.js 全局替换迁移
Vue2 向 Vue3 迁移时，用批量脚本将 ListTemplate.js mixin 替换为内联 `<template>` 块。
## 背景
- 原项目大量组件通过 `@/mixins/ListTemplate.js` 提供 `template: template` 选项。
## 迁移方案
- 脚本 `scripts/replace-list-template.mjs` 扫描 `src/views` 下所有 `.vue` 文件。
- 对仍含 `ListTemplate.js` 且未注释的组件：插入等价 `<template>` 块（分页用 `v-model:limit`，兼容 Vue3），删除 import 与 `template: template`。
- 共处理 221 个 Vue 文件。
- 两个 .js 组件改为 .vue：`views/institution/company/admin.js`→`admin.vue`、`views/transaction/commercialProject/hot.js`→`hot.vue`，删除原 .js，路由解析到 .vue。
## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 2da8b222（cursor session=2da8b222-7992-4e21-8ded-97f901ab42bc）。
- 涉及文件：scripts/replace-list-template.mjs、admin.vue、hot.vue；来源会话ID：2da8b222-7992-4e21-8ded-97f901ab42bc；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listtemplate_migration",
  "source_extraction_id": "d9ab1a0ce9de4c3f9d36f986e9f6078d",
  "version": 1,
  "memory_type": "entities"
}
-->