# 由于缓存和未持久化配置导致的自定义列排序失败
在淮安物管 (zhi2-web-admin) 项目中，el-table 在仅更换 v-for 顺序时不重新排序；displayColumns 未从 localStorage 恢复，且缺少 order 字段的旧数据导致 NaN。

## 问题
- Element UI el-table 在仅通过 v-for 更换顺序时保留列缓存，不重新渲染
- 刷新后 displayColumns 未从 localStorage 恢复；缺少 order 的旧数据在排序时产生 NaN

## 解决方案
- 在 mixins/table.js 中添加 tableColumnsKey，并在 Vuex 为空时从 localStorage 恢复
- 使用 (a.order ?? 0) - (b.order ?? 0) 进行排序
- 在 mixins/ListTemplate.js 中绑定 :key 以重建表格

## 验证
- cursor 会话 23259f03-6ebe-4aaa-8a85-fd3a770bfa1b
- 涉及文件: src/views/autonomy/regulation/components/index.vue, src/components/global-table-config/global-table-config.vue, src/mixins/table.js, src/mixins/listMixins.js, src/mixins/ListTemplate.js, src/store/modules/table.js, src/components/zs-table-column/zs-table-column.vue, src/components/zs-table/zs-table.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "custom_column_sort_cache",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->