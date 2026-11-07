# Report Double main-box Full Height Blank
Root cause: In queryIsResidentialContractList.vue, two .main-box elements both set height: calc(100vh - 65px), causing query area to fill screen with blank space.

## Root Cause
- Two .main-box in queryIsResidentialContractList.vue both have height: calc(100vh - 65px).
- Query area forced to full viewport height leaving blank space.

## Fix
- Remove scoped style; report container uses inline style margin-top:5px; height:calc(100vh - 65px); overflow:auto so query area adapts.
- Reduce empty el-form-item from 4 to 2 (same as housingTransferList).
- For multi-row query, height can be changed to calc(100vh - 162px) referencing contractRecordReportList.

## Verification
- Source: Taicang existing housing project doc 001.md.
- Involved files: queryIsResidentialContractList.vue/.js, queryOffTakeMonthList.vue, housingTransferList.vue, contractRecordReportList.vue, _zsForm.scss.
- Project: 太仓存量房 (Taicang existing housing).
- Source session: 40ebf349-c632-4932-a588-7e64f006ba8d; code baseline: none.

## 验证与归属
- 所属项目：太仓存量房
- 验证证据：extracted source=cursor project=太仓存量房
- 来源会话：40ebf349-c632-4932-a588-7e64f006ba8d


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "report_double_mainbox_blank",
  "source_extraction_id": "4235eeb2161a4346b4c0a4980a2488b6",
  "version": 1,
  "memory_type": "entities"
}
-->
