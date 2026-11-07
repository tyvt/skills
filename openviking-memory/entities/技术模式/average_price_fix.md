# 平均价格表响应修复
平均价格表组件已调整以兼容 API 返回格式。

## 原因
- API `averagePrice` 在 `data` 中返回数组，但三个组件使用了 `response.rows` 导致失败

## 解决方案
- 标准化为 `response.rows || response.data || []` 以兼容

## 涉及文件
- `src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/AveragePriceTable.vue`
- 同一文件夹: `BuildRecordTable.vue`, `historicalPrice.vue`, `detail.vue`
- `src/api/pricemng/recordPriceMng.js`, `src/api/presale/recordPriceMng.js`, `src/api/index.js`, `src/utils/request.js`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：a9f5fddf-6da7-4aa2-811e-c9b3d7941b5e
- 验证证据: 提取自 cursor session=a9f5fddf-6da7-4aa2-811e-c9b3d7941b5e
- 基线: none; 所属项目: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "average_price_fix",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->