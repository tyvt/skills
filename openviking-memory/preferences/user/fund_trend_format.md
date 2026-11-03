- `fundApplyTrend` response format is the same as `leaseApplyTrend`; code already supports root array `[{month,count,...}]` or `{data:[]}` parsing, no code change needed.
- If the bar chart shows mock data, check the Network tab for API 200 status and actual response structure.
- Verified from cursor session 23f97ddb-0548-4b59-92be-632f21518698; related files: fundPanorama/index.vue, fundPanorama/mock.js, assetPanorama/index.vue, mapOverview/index.vue, statisticsMap/index.vue, pubBankAccountQueryRecord.js, bankAccountSupervision/index.vue, property/dashboard/index.vue.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "fund_trend_format",
  "source_extraction_id": "df5493c7835e4a3caf5149b96826070c",
  "version": 1,
  "memory_type": "preferences"
}
-->