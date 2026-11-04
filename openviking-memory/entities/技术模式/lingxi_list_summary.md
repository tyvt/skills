# 基于列表和动态菜单的 LingXi 绑定页面
页面 property/userStatistics/index.vue 使用 GET 列表和摘要，带有后端的动态菜单。

## 行为
- 列表调用 GET /property/userStatistics/list；底部摘要调用 /property/userStatistics/summary。
- 菜单由后端动态生成；需要配置组件路径和权限。

## 必要配置
- 组件: property/userStatistics/index
- 权限: property:userStatistics:list

## 涉及的文件
- property/userStatistics/index.vue
- property/ctUserIdentityApply/index.vue
- maintenance/accountQuery/index.vue
- mixins/listMixins.js, table.js, ListTemplate.js, area.js
- property/syncObligee/index.vue
- property/complex/index.vue

## 验证与归属
- 验证证据: 会话 cursor 6db21291-c1ac-4c3b-921b-5f99e82885a2
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lingxi_list_summary",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->