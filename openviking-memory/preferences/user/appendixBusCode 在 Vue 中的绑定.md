- 在 `AgencyBranchDetail.vue` 中，通过 computed property（第 261:263 行）绑定 `:bus="appendixBusCode"`，读取 `route.meta.busCode` 或回退到 `AGENCY_BRANCH_APPENDIX_BUS` (`fzjgba`)；视图模式 `AnnexUpload` 补充 `:bus`，遵循 `CancelDialog.vue` 的 `cancelBusCode` 模式；归档要求固定为 `fzjgba`。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: appendixBusCode 在 Vue 中的绑定",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 1,
  "memory_type": "preferences"
}
-->
