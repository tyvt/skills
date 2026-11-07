# 价格备案详情 view 模式可编辑字段布局修复
苏州市房地产监测V3 修复价格备案（苏州）详情 view 模式下可编辑字段布局异常。

## 修改内容
- recordPriceMngContentInfo.js：所属片区可编辑用 slot 否则 text；区县/市级备案意见可编辑用 slot 否则 textarea 并加 autoHeight: true；移除原 hide 逻辑
- detail-template.vue：新增 isAutoHeightItem() 支持 item.autoHeight，避免 slot 内 textarea 被裁切
- detail.vue 与 changeDetail.vue：配合上述组件完成 view 模式布局修复

## 涉及文件
- src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/recordPriceMngContentInfo.js
- src/components/detail-template/detail-template.vue
- src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue
- src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/changeDetail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：d1912a45-dc41-4e50-8470-0a1d18d1c8c0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_layout_fix",
  "source_extraction_id": "dfa75a1a33464c4a91b18744ec547ae7",
  "version": 1,
  "memory_type": "entities"
}
-->