# prop 与 mixin 的计算属性之间的命名冲突
`AgencyBasicInfoDetail` 混入 `detailMixins`，其计算属性 `mode` 与组件的 prop `mode` 冲突，导致覆盖。

## 修正
- prop 重命名为 `detailScope`
- `loadDetail` 使用 `this.detailScope === 'admin'` 进行判断
- 引用的组件 `toB/agencyRecord/detail.vue` 无需更改

## 验证与文件
- 验证证据: src=苏州市房地产监测V3/262.md
- 涉及文件: AgencyBasicInfoDetail.vue, mixins/detailMixins.js, toB/agencyRecord/detail.vue, DeveloperBasicInfoDetail.vue, mixins/form.js, mixins/formComponents.js
- 所属项目: 苏州市房地产监测V3; session: d7c5546b-aa33-4b71-aad6-e797b69bb1eb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prop_mixin_mode",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->