- `buildQualificationListPayload` 在 `registerQualification.js` 中仅发出包含真实内容的行（默认资格类型不视为已填写）
- 当 `strict: false` 时，未填写的行会通过；填写了一半的行会被 `validateRow` 拦截
- `Step4Shareholders.vue` 在提交验证中使用 `strict: false`
- `buildSubmitPayload` 仅在 `qualificationList.length > 0` 时包含 `qualificationList` 字段，从而避免空对象

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 企业资质验证",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "preferences"
}
-->
