# permitExtend Column Config
permitExtend/index.vue columns() sets project name as text and extension number as link to detail.

## Configuration
- `项目名称` configured as `type: 'text'` with `showOverflowTooltip`, placed in first column
- `延期申请编号` configured as `type: 'link'` with `function: this.handleView` passing `presalePermitExtendId` to detail

## Attribution
- Source session: c0158687-53dd-4468-a19c-21916c1b2d50
- Project: 苏州市房地产监测V3
- Files: permitExtend/index.vue, listMixins.js, zs-table-column.vue, ListTemplate.js

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "permit_extend_columns",
  "source_extraction_id": "6c363dc7a77448a1a17cc850c32df4b1",
  "version": 1,
  "memory_type": "entities"
}
-->