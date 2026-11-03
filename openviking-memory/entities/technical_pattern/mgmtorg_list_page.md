# 管理主体列表页动态路由与zs-search-form
`pubManagementOrg/index.vue` 为 Vue 2 列表页主文件，路由由后端菜单动态加载，筛选字段经 `computed.formItems` 与 `data.queryParams` 定义并由 `<zs-search-form>` 渲染。

## 架构要点
- `zhi2-web-admin/src/views/benefit/pubManagementOrg/index.vue` 是 Vue 2 列表页主文件
- 路由由后端菜单动态加载，无静态路由配置
- 筛选字段经 `computed.formItems` 与 `data.queryParams` 定义，由 `<zs-search-form>` 渲染

## 关联依赖
- 复用 `mixins/listMixins.js`、`mixins/table.js`、`mixins/detailMixins.js`、`mixins/form.js`
- 同项目类似列表页：`pubRegulatoryAccount/index.vue`、`pubExpenditureContract/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor session=446b2e65-e29c-469c-8ea5-054af1f9ad45
- 涉及文件：zhi2-web-admin/src/views/benefit/pubManagementOrg/index.vue、zhi2-web-admin/src/mixins/listMixins.js、zhi2-web-admin/src/views/benefit/pubManagementOrg/detail.vue、zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue、zhi2-web-admin/src/views/benefit/pubExpenditureContract/index.vue、zhi2-web-admin/src/mixins/detailMixins.js、zhi2-web-admin/src/mixins/form.js
- 所属项目：宜兴公共收益；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "mgmtorg_list_page",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 2,
  "memory_type": "entities"
}
-->