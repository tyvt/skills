# permitExtend 列配置
permitExtend/index.vue columns() 将项目名称设置为文本，将延期申请编号设置为详情链接。

## 配置
- `项目名称` 配置为 `type: 'text'` 并带有 `showOverflowTooltip`，放置在第一列
- `延期申请编号` 配置为 `type: 'link'` 并使用 `function: this.handleView` 将 `presalePermitExtendId` 传递到详情

## 归属信息
- 源会话：c0158687-53dd-4468-a19c-21916c1b2d50
- 项目：苏州市房地产监测V3
- 文件：permitExtend/index.vue, listMixins.js, zs-table-column.vue, ListTemplate.js

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "permit_extend_columns",
  "source_extraction_id": "6c363dc7a77448a1a17cc850c32df4b1",
  "version": 1,
  "memory_type": "entities"
}
-->