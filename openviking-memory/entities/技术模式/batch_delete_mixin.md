# 列表批量删除复用mixin回退this.ids
苏州市房地产监测V3中personnelRecord与staffManagement的列表批量删除改为复用mixin的multiDeleteButton，并回退this.ids避免读取错误。

## 问题根因
- personnelRecord/components/index.vue与staffManagement/components/index.vue的operationButtons未复用mixin批量删除
- handleDelete直接读personnelRecordId易出错

## 解决方案
- operationButtons改为调用mixin的this.multiDeleteButton
- disabled绑定this.selection.length === 0置灰未勾选项
- handleDelete回退this.ids避免personnelRecordId读取错误

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/116.md
- 涉及文件：toB/personnelRecord/index.vue、toB/personnelRecord/components/index.vue、mixins/listMixins.js、mixins/table.js、package.json、路由信息.json、前端技术信息.md、workbuddy/memory/MEMORY.md
- 所属项目：苏州市房地产监测V3；来源会话：46f44839-514d-49c6-b6e2-858af0e1b263；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "batch_delete_mixin",
  "source_extraction_id": "a96f2a8bf0c74ea3bdbaaf4355ce91e5",
  "version": 1,
  "memory_type": "entities"
}
-->