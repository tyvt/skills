# Sina Quote API Encoding and Request Convention
The Sina quote interface hq.sinajs.cn requires replacing the dot in stock codes with $ and returns GB18030-encoded data; the frontend must use Axios with arraybuffer and GB18030 decoding.

## Request and Encoding Rules
- Sina quote interface domain is hq.sinajs.cn
- Replace the dot (.) in stock codes with $ before requesting
- Interface returns GB18030-encoded binary data that must be explicitly decoded

## Frontend Implementation
- Axios sets responseType to arraybuffer
- GB18030 decoding is done inside transformResponse on the returned data
- Request headers must attach a Sina Referer to pass interface authentication

## Related Files
- d:/repository/leek-fund/src/explorer/stockService.ts
- d:/repository/leek-fund/src/explorer/fundService.ts
- d:/repository/leek-fund/src/shared/tencentStock.ts
- d:/repository/leek-fund/src/explorer/leekService.ts
- d:/repository/leek-fund/src/data/fundSuggestData.ts
- d:/repository/leek-fund/src/service/eastmoney.ts
- d:/repository/leek-fund/src/webview/fundHistory.ts
- d:/repository/leek-fund/src/shared/aiStockHistoryData.ts

## Verification and Attribution
- Source session: 0ab12128-c9a7-4aa0-a0fe-c5d1bd320633
- Code baseline: none
- Project: leek-fund

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "sina_hq_gb18030",
  "source_extraction_id": "14c19a2a2d0d40c2b32acd2f914a70b4",
  "version": 1,
  "memory_type": "entities"
}
-->