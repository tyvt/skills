# 价格备案列表查询区统一调整
苏州市房地产监测V3 项目统一调整价格备案下所有列表子菜单的查询区文案与筛选项。

## 修改位置
- zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue
- 详情页 detail.vue、changeDetail.vue、recordPriceMngContentInfo.js 此前已一致无需改

## 调整项
- 申请单位 → 备案申请单位（含 placeholder）
- 申请时间 → 备案申请时间（含 placeholder）
- 去掉「区域」筛选项、regionCode 查询参数及区划数据加载
- created / 重置时删除残留 regionCode、region 避免旧缓存带区划条件

## 未改动
- 价格备案参数维护（priceParameters）仍以「区域」为业务主字段，与本次去区划无关

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话ID：60c2aa36-5b7d-4346-9e4c-362620747abd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_list_query_fix",
  "source_extraction_id": "d2241605997b4738a763da461ea5ccb9",
  "version": 1,
  "memory_type": "entities"
}
-->