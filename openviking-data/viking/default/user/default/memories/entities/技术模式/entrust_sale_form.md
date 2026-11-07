# 委托代售详情 zs-form 禁用致要件按钮不可点
苏州市房地产监测V3预售委托代售详情页 zs-form 的 disabled 绑定级联禁用了要件区域按钮，已移除并简化为 bizState 判断。

## 问题根因
- detail.vue 中 zs-form 的 :disabled="isFormDisabled" 级联禁用要件区域按钮
- canOperateAppendix 判断冗余

## 修复方案
- 移除 disabled 绑定，canOperateAppendix 仅判 bizState==='0'
- FileList.vue 备注/保存按钮增 $attrs.operable 条件
- E2E 新增 assertEntrustSaleAppendixButtons 校验

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/055.md
- 涉及文件：presale/entrustSale/detail.vue、mixins/detailMixins.js、mixins/form.js、components/AnnexUpload/index.vue、components/AnnexUpload/components/FileList.vue、e2e/presale/entrust-sale-real-api-flow.spec.js、e2e/fixtures/entrust-sale-helpers.js、supervision/agreement/version/detail.vue
- 来源会话：80d2603f-f2d9-4f58-9273-3841d86f0ce0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_form",
  "source_extraction_id": "44b97381139d40c9b4eb87bf138f6ca4",
  "version": 1,
  "memory_type": "entities"
}
-->