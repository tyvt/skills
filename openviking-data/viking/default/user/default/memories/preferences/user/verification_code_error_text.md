- In zhi2-web-admin/src/views/register/components/accountInfo.vue, the goNextStep() verification-code failure branch splits by res.msg keywords: if res.msg contains "超时/过期/失效" (timeout/expired) show a timeout hint, otherwise show an error hint; both branches auto-refresh the image and clear the input.
- Evidence: src=苏住房G/057.md; files: accountInfo.vue, request.js, api/index.js, login.vue.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "verification_code_error_text",
  "source_extraction_id": "4d5aade41f6344da9fefe4ce3287d49a",
  "version": 1,
  "memory_type": "preferences"
}
-->