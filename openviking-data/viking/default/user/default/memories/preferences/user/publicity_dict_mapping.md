- In `src/pages_maintain_project/maintainProject.js`, define `MF_PUBLICITY_TYPE` and `MF_PUBLICITY_CONCLUSION` constants mapping to `t_mf_publicityType` and `t_mf_publicityConclusion` dictionaries respectively.
- `fetchPublicityDetail` uses `Promise.all` to fetch dictionaries in parallel; `mapPublicityDetail` converts text via `dictLabel` and falls back to the original value when no match.
- Verification: src=泰兴小程序/025.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "publicity_dict_mapping",
  "source_extraction_id": "1347c22671b64dc1a595c525039a2a5f",
  "version": 1,
  "memory_type": "preferences"
}
-->