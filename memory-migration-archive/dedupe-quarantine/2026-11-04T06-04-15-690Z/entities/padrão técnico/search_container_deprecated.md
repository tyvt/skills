# 未注册search-container引发Vue警告
页面使用项目已不再注册的旧组件 `<search-container>` 触发 Vue warn，应替换为 `<zs-search-form>`。

## 问题现象
- 使用未注册的旧组件 `<search-container>` 触发 Vue warn

## 解决方案
- 替换为 `<zs-search-form>`（参考 `pubElevMaintenance/index.vue` 通过 `listMixins` 自动注册）
- 新增 `formItems` 计算属性配置小区名称、年度、是否对外发布、业务状态四项搜索

## 验证与归属
- 验证证据：src=园区物管2.0/030.md
- 涉及文件：zhi2-web-admin/src/views/benefit/pubElevMaintenanceNew/index.vue、zhi2-web-admin/src/views/benefit/pubCheckoutManage/index.vue、zhi2-web-admin/src/mixins/listMixins.js、zhi2-web-admin/src/views/benefit/pubElevMaintenanceNew/detail.vue、zhi2-web-admin/src/views/benefit/pubEngConsIncome/index.vue、zhi2-web-admin/src/views/benefit/pubElevMaintenanceNew/components/expendTable.vue、zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/mixins/permsMixins.js
- 所属项目：园区物管2.0；代码基线 none；来源会话 31f93d40-0b1b-4532-9404-1e8c008776f8

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "search_container_deprecated",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 2,
  "memory_type": "entities"
}
-->