# 保证金协议详情页字典误用致显数字
保证金协议详情页误用字典 `mf_guarantee_agreement_state` 致 dict-tag 回退显示原始值 `0`，需统一为 `agreement_state` 字典。

## 问题根因
- 详情页加载字典 `mf_guarantee_agreement_state` 无数据，`dict-tag` 回退显示原始值 `0`
- 列表页使用 `agreement_state` 字典正常显示

## 解决方案
- 统一 `guaranteeDepositAgreement/detail.vue`、`index.vue` 与 `guaranteeDepositAgreementEnd/detail.vue`、`index.vue` 的字典类型为 `agreement_state`

## 关联格式问题
- 详情页「签订日期」显示为 `2026-07-21T00:00:00.000+08:00` 是因为字段用 `type: 'text'`；如需格式化为 `2026-07-21` 可改为 `type: 'datetime'`

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue、index.vue、mixins/detailMixins.js、components/detail-template/detail-template.vue、components/dict-tag/dict-tag.vue、guaranteeDepositAgreementEnd/detail.vue、components/zs-table-column/zs-table-column.vue、mixins/ListTemplate.js
- 所属项目：产品2.0；来源会话：654476f2-c8c2-4687-a36b-cfc42a35337b；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agreement_dict_misuse",
  "source_extraction_id": "4a4687e501644f5c9730ebec13b67ef5",
  "version": 2,
  "memory_type": "entities"
}
-->
