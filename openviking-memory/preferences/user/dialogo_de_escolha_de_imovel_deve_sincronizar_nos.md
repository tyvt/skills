- `chooseHouseDialog.vue` 需在 `loadNode` 中同步 `projectInfo`/`buildCode`，以避免 `contract/index.vue` 丢失参数，以及 `created` 无法捕获 Promise 拒绝。
- 修复：在所有节点层级同步信息，提交时校验，路由携带 `projectCode`；编辑页面若参数缺失则调用 `getContractMainInfo` 并使用 `try/catch` 提前返回。
- `pre/chapter3.vue` 等必须处理空字典。
- 涉及文件: contract/index.vue, store/modules/contract.js, contract/chapters/pre/chapter3.vue, commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue, contractMainInfo/index.vue, contract/mixins/indexFrame.js, contract/mixins/mixin.js, mixins/detailMixins.js
- 验证证据: src=苏州市房地产监测V3-rest/065.md; session a735a6fd-dc76-4817-a33c-8400bcf1b742

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 房产选择对话框应同步节点",
  "source_extraction_id": "02eb0702b37d4c818a0d3ecbb60fdac6",
  "version": 1,
  "memory_type": "preferences"
}
-->
