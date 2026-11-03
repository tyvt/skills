# 预售延期列表项目名文本编号link跳转
苏州市房地产监测V3 预售延期列表的项目名称设为文本、延期编号设为链接跳转详情。

## 实现要点
- `src/views/presale/permitExtend/index.vue` 的 `columns()` 将 `projectName` 置首列并设为 `type: 'text'` 保留 `showOverflowTooltip`
- `extendCode` 设为 `type: 'link'` 且 `function: this.handleView` 经 `presalePermitExtendId` 跳转详情

## 涉及文件
- d:/repository/苏州市房地产监测V3/路由信息.json
- zhi2-web-admin/src/views/presale/permitExtend/index.vue、permitCancel/index.vue
- zhi2-web-admin/src/mixins/listMixins.js、ListTemplate.js
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/206.md
- 来源会话ID：c0158687-53dd-4468-a19c-21916c1b2d50
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_extend_link_detail",
  "source_extraction_id": "7c52ca680f5d40fc86e1dc2ee1d799dc",
  "version": 1,
  "memory_type": "entities"
}
-->