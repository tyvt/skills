
# 价格备案模块详情页统一使用 DetailTemplate
苏州市房地产监测V3 价格备案相关模块的详情页组件已全部覆盖并统一使用 DetailTemplate。

## 路由与详情组件映射
- `RecordPriceMngSuzhou/:tableid` 价格备案申请 → `detail.vue`
- `County/:tableid` 价格备案(区县)、`City/:tableid` 价格备案(市级)、`Department/:tableid` 征求意见、`Recordpricemngfile/:tableid` 价格备案归档 → 均 `detail.vue`
- `Filingschange/:tableid` 价格备案申请变更、`Countychange/:tableid` 价格备案变更(区县)、`Citychange/:tableid` 价格备案变更(市级) → 均 `changeDetail.vue`

## 涉及文件
- `detail.vue`、`changeDetail.vue`、`priceParameters/detail.vue`、`recordPriceHouse/detail.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：20e12931-e556-44aa-9ac8-050ec0af34f9；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_detail_template",
  "source_extraction_id": "51f509fc1cfc4814bd2e840f740c0807",
  "version": 1,
  "memory_type": "entities"
}
-->