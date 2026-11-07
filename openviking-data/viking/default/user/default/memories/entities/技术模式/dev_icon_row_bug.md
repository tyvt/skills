# 开发企业首页旧组件致步骤无箭头角标
开发企业首页曾误用 HomeDeveloperIconRow 而非 HomeBizSection，导致步骤无箭头且带序号角标；已切换为 HomeBizSection 并删除旧组件。

## 根因
- 开发企业首页使用 `HomeDeveloperIconRow` 渲染商品房板块，而非 `HomeBizSection`，步骤无箭头且带序号角标。

## 修复方案
- `HomeLayoutSidebar.vue` 改渲染 `HomeBizSection`。
- `homeDataMixin.js` 以 `developerCommodityFlow` 传入完整商品房板块（含 theme、title、steps）。
- `index-new.vue` 绑定 `:developer-flow`。
- 删除 `HomeDeveloperIconRow.vue`。

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：src=门户/032.md
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeBizSection.vue、src/views/home/config/homeLayout.js、src/views/home/index-new.vue、src/views/home/mixins/homeDataMixin.js、src/views/home/components/HomeDeveloperIconRow.vue、src/views/home/components/layouts/HomeLayoutSidebar.vue、src/views/home/components/layouts/HomeLayoutAdmin.vue
- 所属项目：门户；来源会话ID：439693b0-982f-4355-a0e8-3210cd7a2d24；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dev_icon_row_bug",
  "source_extraction_id": "eeb4eae15e2a49d9927fbe95734fea10",
  "version": 1,
  "memory_type": "entities"
}
-->