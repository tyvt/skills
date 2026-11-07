# 预售价格楼幢列表修复
产品2.0 预售价格备案楼幢列表（`recordPriceMngSuzhou`）修复 API 路径与防御性处理问题。

## 问题
- `listRecordPriceBuild` 接口路径曾被错误修改，导致请求异常与 Vue 警告（vue.js:5108 [Vue warn]）
- `getList` 中直接访问 `response.rows.length`，接口无 `rows` 字段时模板报错

## 修复要点
- API 路径改回 `POST /presale/priceBuilding/page`
- `getList` 改为 `response.rows || []` 与 `response.total || 0`，避免无 `rows` 时访问 `.length` 报错
- 刷新详情页后「楼幢」tab 请求 `POST /presale/priceBuilding/page`，参数含 `pageNum`、`pageSize`、`priceRecordId`

## 涉及文件
- zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildingsTable.vue
- zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：08444023-c60e-41b0-9e6e-c49324a5d33b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_building_fix",
  "source_extraction_id": "5c881ec3a20f414facbaf9f447492b5b",
  "version": 1,
  "memory_type": "entities"
}
-->