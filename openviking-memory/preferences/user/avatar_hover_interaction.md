- In userAvatar.vue, the `.user-info-head` `:hover ::after` pseudo-element overlay mask caused touch devices to only trigger hover on first tap without opening the avatar-edit dialog; removed the hover mask style and kept `cursor:pointer` so the click directly opens the dialog.
- Files: views/system/user/profile/userAvatar.vue, views/system/user/profile/index.vue
- Verification: source session 131a52c3-5204-4b7a-b895-8e3be39ebfcb; code baseline none

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：131a52c3-5204-4b7a-b895-8e3be39ebfcb


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "avatar_hover_interaction",
  "source_extraction_id": "5106496ed8504ce0a2fa830793207d6b",
  "version": 1,
  "memory_type": "preferences"
}
-->
