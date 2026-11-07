# Decision PlayerName Store
Submit logic for decision/elect forms assigns decisionPlayerName from userStore.realName.

## Changes
- user.js/user.ts add getter `realName` mapping username/data.realName
- pages_owner/decision/form.vue, elect/form.vue, decision/components/multiple/ViewOptionsList.vue submit uses userStore.realName
- Display pages (DecisionRecord.vue etc.) still use API returned decisionPlayerName

## Files
- src/store/user.js, src/store/user.ts, src/pages_owner/decision/form.vue, src/pages_owner/elect/form.vue, ViewOptionsList.vue, api/autonomy.js, main.ts, my.vue

## Verification
- Evidence: src=i淮安公版/002.md
- Source session: b9a67129-a3c8-45ef-a049-365dbe342883

## 验证与归属
- 所属项目：i淮安公版
- 验证证据：extracted source=cursor project=i淮安公版
- 来源会话：b9a67129-a3c8-45ef-a049-365dbe342883


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "decision_playername_store",
  "source_extraction_id": "2bcf1d30c3a547de9ea1ba2aa3fb1c87",
  "version": 1,
  "memory_type": "entities"
}
-->
