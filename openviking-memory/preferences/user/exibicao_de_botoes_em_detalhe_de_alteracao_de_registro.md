- 在详情页 `toB/companyRecord/detail.vue` 和 `toB/agencyRecord/detail.vue` 中应启用 `:show-back="true"`、`:show-edit="showChangeEditBtn"`（取决于 `view` + `changeBizState==='0'` + 不在审核中）和 `:show-approval` 以查看流程。
- 实现 `@update="getDetail"` 并在 `detailCallback`/`loadChangeDetailFromOwnCompany` 中保持 `changeBizState` 以控制 `:biz-state` 和显示。
- 涉及的文件：zhi2-web-admin/src/views/toB/companyRecord/detail.vue, companyRecordAgency/change/detail.vue, toB/agencyRecord/detail.vue, toB/personnelRecord/components/detail.vue, src/main.js, src/mixins/detailMixins.js, package.json, e2e/company/company-record-change.spec.js
- 验证证据: src=苏州市房地产监测V3-rest/063.md; 会话 651e58d0-833a-407d-b950-d0210aaf6ccc

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 记录变更详情中按钮的显示",
  "source_extraction_id": "02eb0702b37d4c818a0d3ecbb60fdac6",
  "version": 1,
  "memory_type": "preferences"
}
-->
