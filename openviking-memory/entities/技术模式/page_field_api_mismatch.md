# 页面字段名与接口不一致致数据读取失败
页面字段名（`loadLimit`、`contact`等）与接口实际字段（`loanAmount`、`contactInformation`等）不一致，导致除 `applicationMaterials`、`unableLoan` 外区块数据读取失败。

## 问题根因
- 页面使用 `loadLimit`、`contact` 等字段名，接口实际返回 `loanAmount`、`contactInformation`
- 字段名不匹配导致区块数据读取失败（除特定区块外）

## 解决方案
- 在 `fddydetail.vue` 中字段名全部对齐接口，联系方式使用 `contactInformation`

## 验证与归属
- 验证证据：src=cursor session=9264f45e-ecce-4dd7-99a3-b9af544b8e18
- 涉及文件：ZsRichText.vue、PhoneCall.vue、utils/index.js、ListDetail.vue、sfb.js、formatter.js、announcement/detail.vue、publicNotice/components/ListDetail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：9264f45e-ecce-4dd7-99a3-b9af544b8e18；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "page_field_api_mismatch",
  "source_extraction_id": "3a59079b73a04c218cfc0817a391dccd",
  "version": 1,
  "memory_type": "entities"
}
-->