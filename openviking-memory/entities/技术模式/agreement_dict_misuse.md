# 保证金协议详情页字典误用致显数字
保证金协议详情页误用字典 `mf_guarantee_agreement_state` 致 dict-tag 回退显示原始值 `0`，需统一为 `agreement_state` 字典。

## 问题根因
- 详情页加载字典 `mf_guarantee_agreement_state` 无数据，`dict-tag` 回退显示原始值 `0`
- 列表页使用 `agreement_state` 字典正常显示

## 解决方案
- 统一 `guaranteeDepositAgreement/detail.vue`、`index.vue` 与 `guaranteeDepositAgreementEnd/detail.vue`、`index.vue` 的字典类型为 `agreement_state`

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue、index.vue、mixins/detailMixins.js、components/detail-template/detail-template.vue、components/dict-tag/dict-tag.vue、guaranteeDepositAgreementEnd/detail.vue、components/zs-table-column/zs-table-column.vue、mixins/ListTemplate.js
- 所属项目：产品2.0；来源会话：654476f2-c8c2-4687-a36b-cfc42a35337b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agreement_dict_misuse",
  "source_extraction_id": "61bcf916e961454588f66fa839204bbe",
  "version": 1,
  "memory_type": "entities"
}
-->