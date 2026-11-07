# sourcePermitNo 在现售列表中的映射

在 苏州市房地产监测V3 项目中，预售转现售列表需要映射 `sourcePermitNo` 并修正标签。

## 问题
- 在 `cashsaleListMixin.js` 中，列标题文本错误，且“预售许可证编号”列映射了 `permitNo`，与 API 字段 `sourcePermitNo` 不符。

## 修正
- 列标题修正为“预售转现售申请编号”。
- `prop` 改为 `sourcePermitNo`，并带有兜底 formatter `row.sourcePermitNo || row.permitNo || '-'`。
- 筛选仍使用 `permitNo` 进行查询。

## 涉及文件
- `src/views/presale/cashsale/components/CashsaleTransferList.vue`, `CashsaleInfoPanel.vue`, `CashsaleDetail.vue`
- `src/views/presale/cashsale/cashsaleListMixin.js`, `transfer/index.vue`, `cashsaleConstants.js`
- `src/mixins/listMixins.js`
- `e2e/presale/cashsale-transfer-real-api-flow.spec.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据: src=苏州市房地产监测V3/188.md
- 来源会话: 2d5fa078-1499-48cb-8fca-5cc13ccc4a4d
- 所属项目: 苏州市房地产监测V3; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_source_permit",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 1,
  "memory_type": "entities"
}
-->