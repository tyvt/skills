# 选房弹窗同步信息避免创建异常
苏州市房地产监测V3 的 chooseHouseDialog.vue 在展开项目/楼栋/单元时同步 projectInfo 与 buildCode，提交前校验，避免创建异常。

## 实现要点
- `chooseHouseDialog.vue` 展开项目/点楼栋/单元时同步 `projectInfo` 与 `buildCode`，提交前校验
- `contract/index.vue` 在 add 缺 code 时调 `getContractMainInfo` 兜底并 `try/catch`
- `pre/chapter3.vue` 等处理字典空数据避免报错

## 涉及文件
- zhi2-web-admin/src/views/contract/index.vue、store/modules/contract.js
- zhi2-web-admin/src/views/contract/chapters/pre/chapter3.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/index.vue
- zhi2-web-admin/src/views/contract/mixins/indexFrame.js、mixin.js
- zhi2-web-admin/src/mixins/detailMixins.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/115.md
- 来源会话：a735a6fd-dc76-4817-a33c-8400bcf1b742；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "choose_house_sync",
  "source_extraction_id": "b79ed4e1f3b24aa293ba672b370861aa",
  "version": 1,
  "memory_type": "entities"
}
-->