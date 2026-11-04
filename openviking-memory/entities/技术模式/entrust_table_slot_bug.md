# EntrustBuildingTable 列插槽解构错误致删除失效
苏州市房地产监测V3 中 EntrustBuildingTable.vue 误用 slot-scope="scope" 致 scope.row 为 undefined，删除按钮失效。

## 问题根因
- zs-table-column 透传 :scope="scope"，插槽 props 为 { scope } 而非直接 row
- EntrustBuildingTable.vue 操作列误用 slot-scope="scope" 致 scope.row 为 undefined
- 报错被 .catch 静默吞掉，删除/批量删除按钮失效
- 同样的未解构的 `slot-scope="scope"` 模式也影响了 `CommercialHousingTable.vue`, `buildingTable/index.vue` 以及其他约20个文件 (src=苏州市房地产监测V3/057.md)

## 解决方案
- 操作列插槽改为 slot-scope="{ scope }" 以正确解构
- handleDelete/handleBatchDelete 增加 id 与 res.code 校验

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/039.md
- 涉及文件：EntrustBuildingTable.vue、detail.vue、entrust-sale-helpers.js、main.js、element.js、Headline/index.vue、vite.config.js、e2e spec 等
- 所属项目：苏州市房地产监测V3；来源会话：ad31939a-64bd-4cd1-bc4c-21c4d54679cd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_table_slot_bug",
  "source_extraction_id": "286d4a02568d45098deccb6676a841bb",
  "version": 2,
  "memory_type": "entities"
}
-->