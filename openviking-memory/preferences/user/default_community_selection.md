- Owner proposal and similar features require userStore.project to carry community info
- Home_Suzhufang.vue onShow calls src/hooks/useBoundProjects.js; when userStore.project is empty, fetch list via listComplexCommunitySubdistrictByToken and default-select the first item
- Property_Suzhufang.vue reuses the same hook to avoid logic inconsistency
- Source session: 975a7c63-ba48-4d7b-a799-8262cfc26787

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：975a7c63-ba48-4d7b-a799-8262cfc26787


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "default_community_selection",
  "source_extraction_id": "cca3283d59234382a661ee1cf592f0d3",
  "version": 1,
  "memory_type": "preferences"
}
-->
