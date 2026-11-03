# 停车位资产分组前端写死并按字段过滤
园区物管2.0 operatingAssets.vue 中停车位资产明细改为前端写死三类（产权/机械/人防），按字段独立过滤，不再请求字典接口。

## 行为描述
- 停车位资产明细前端写死三类：产权车位、机械车位、人防车位
- 依据 parkingSpacePrType 等字段独立过滤展示

## 关键实现
- normalizeAssetDetailRows 设 skipTypeValueFilter: true 保留全量明细
- 再由 buildParkingCategoryTableRows 按字段过滤
- 不再请求字典接口，减少依赖

## 验证与归属
- 验证证据：extracted source=cursor session=0d1c92d5-ca99-486d-84eb-ecd843c0836e
- 涉及文件：operatingAssets.vue
- 所属项目：园区物管2.0；来源会话ID：0d1c92d5-ca99-486d-84eb-ecd843c0836e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_asset_hardcode",
  "source_extraction_id": "addfb2f3b8c345c6ab59dedb2975d7b9",
  "version": 1,
  "memory_type": "entities"
}
-->