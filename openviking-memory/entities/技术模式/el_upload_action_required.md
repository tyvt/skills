---
audit_status: valid
last_checked: 2026-11-27T18:27:15+08:00
verdict_note: 产品2.0 certificatesDialog.vue(-http-request)与userAvatar.vue命中，el-upload action必填描述属实
---
# el-upload 必须传 action 属性
Element UI 的 `el-upload` 在使用自定义上传时仍需必填 `action`，否则控制台报 `Missing required prop: "action"` 警告。
## 问题根因
- `certificatesDialog.vue` 使用 `:http-request="handleUpload"` 自定义上传但未传 `action`，触发 Vue 警告。
## 解决方案
- 在 `el-upload` 上增加 `action="#"`，与 `userAvatar.vue` 用法一致。
- 自定义 `http-request` 会接管实际上传逻辑，不会真正请求 `#`。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：certificatesDialog.vue、userAvatar.vue
- 所属项目：产品2.0；来源会话：a3245b72-8923-4386-a8ad-ff00068ae739；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_upload_action_required",
  "source_extraction_id": "2d4686a934d3454e8470a4b3531e3d9b",
  "version": 1,
  "memory_type": "entities"
}
-->