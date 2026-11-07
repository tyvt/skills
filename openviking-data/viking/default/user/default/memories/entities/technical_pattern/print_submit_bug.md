# Print Submit Flag Bug
mfap_MfapFinalSharePublicDetail.js shareDetailPrint() missing submitConTig=true caused submitForm() to block submission.

## Description
- In shareDetailPrint() success callback, submitConTig was not set true, unlike exportExcel() logic.
- submitForm() intercepts submit due to missing flag, causing submission failure.

## Solution
- Set this.submitConTig = true in success callback of shareDetailPrint() to align with exportExcel().

## Verification and Attribution
- Verification: extracted from cursor session 553dcf6a-8386-4166-a8c5-2cbd36497fe6.
- Involved files: mfap_MfapFinalSharePublicDetail.js, mtpl_MtplMoneySharePubDetail.js, mfap_MfapFinalSharePublicDetail.shtml.
- Source session ID: 553dcf6a-8386-4166-a8c5-2cbd36497fe6.

## 验证与归属
- 所属项目：园区V0
- 验证证据：extracted source=cursor project=园区V0
- 来源会话：553dcf6a-8386-4166-a8c5-2cbd36497fe6


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "print_submit_bug",
  "source_extraction_id": "1429bde0b94f491e903b99dc6f297e69",
  "version": 1,
  "memory_type": "entities"
}
-->
