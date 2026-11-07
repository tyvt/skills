- Wrap 「附件图片」(attachment images) and 「备注」(remarks) into a new Headline block 「其他信息」(other info) to reuse the margin-top:12px block spacing.
- Add v-if="formMode != 'view'" to the edit block to prevent duplicate display with regulatoryInfo's DetailTemplate view mode.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "attachment_layout",
  "source_extraction_id": "e0181ed368f74bb2ace2c92ca2241393",
  "version": 1,
  "memory_type": "preferences"
}
-->