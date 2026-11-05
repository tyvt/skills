# zs-pagination v-model 迁移与全局替换
产品2.0（zhi2-web-admin）将分页组件从 .sync 语法迁移到 Vue3 v-model 语法，并通过全局正则一次性批量替换。

## 变更背景
- zs-pagination 组件已改为 `v-model:current-page` / `v-model:page-size`
- property/complex/index.vue 已从 `:page.sync` / `:limit.sync` 改为 `v-model:page` / `v-model:limit`，翻页正常
- 仓库仍有大量其它页面在用 `.sync`，单文件逐个改不现实且易漏

## 全局替换规则
- 在 `zhi2-web-admin/src` 目录下用全局正则替换
- `:page\.sync="` → `v-model:page="`
- `:limit\.sync="` → `v-model:limit="`
- `<zs-select([^>]*):value\.sync="` → `<zs-select$1v-model:value="`

## 验证与归属
- 涉及文件：property/complex/index.vue、@zhi2-web-admin/src/components/zs-pagination/zs-pagination.vue
- 所属项目：2-0（产品2.0）；来源会话：73a5ecd2-f9fb-443b-b4b0-8e8521acce74；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_pagination_migration",
  "source_extraction_id": "3a52587429214e928da433b2513702f3",
  "version": 1,
  "memory_type": "entities"
}
-->