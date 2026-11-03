- Prefers dynamically resolving `busCode` from menu route `meta` (falling back to menu `filePath`) instead of hardcoding constants such as `SURVEY_CHANGE_BUS_CODE`.
- `surveyChangeConstants.js` should provide `resolveSurveyChangeBusCode(route)` rather than static bus-code constants.
- `detail.vue` should compute `surveyChangeBusCode` by prioritizing the detail's `attachmentBusCode`, otherwise resolving from the menu, and pass `busCode` to `ApprovalDialog.vue` as a prop.
- E2E test cases should read `busCode` from menu meta rather than using hardcoded values.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dynamic_buscode_resolution",
  "source_extraction_id": "291e87acf6c04172af7e4add2ede74d6",
  "version": 1,
  "memory_type": "preferences"
}
-->