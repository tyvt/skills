# el-upload必填action未传致Vue警告
苏州市房地产监测V3 的 InstitutionUploadItem 中 el-upload 仅用 :http-request 未传必填 action，触发 Vue 警告，补充 action="#" 修复。

## 问题根因
- Element UI `el-upload` 的 `action` 为必填字符串
- `InstitutionUploadItem` 仅用 `:http-request` 未传 `action`，导致 `initAppendix` 渲染附件项时触发 Vue 警告

## 修复方案
- 在 `InstitutionUploadItem.vue` 两处 `el-upload` 增加 `action="#"`（同 `RegisterUploadItem.vue`）
- `#` 仅满足校验，真实上传仍由 `handleUpload`/`uploadInstitutionAppendix` 处理

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/130.md
- 涉及文件：InstitutionUploadItem.vue、RegisterUploadItem.vue
- 所属项目：苏州市房地产监测V3；来源会话：7d2c6ace-ba93-4a45-988e-36327eaa2c19；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "elupload_action_fix",
  "source_extraction_id": "c528e142327a41bfb03c13f6bb4bbae9",
  "version": 1,
  "memory_type": "entities"
}
-->