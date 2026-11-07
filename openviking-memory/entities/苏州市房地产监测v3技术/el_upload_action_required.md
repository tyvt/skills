# el-upload未设action必填项触发警告
苏州市房地产监测V3 的 InstitutionUploadItem 仅用 :http-request 未传 action，触发 el-upload 必填校验警告，增加 action="#" 修复。

## 问题根因
- Element UI `el-upload` 要求 `action` 为必填字符串
- `InstitutionUploadItem.vue` 仅用 `:http-request` 未传 `action`，于 `initAppendix` 渲染时触发警告

## 修复方案
- 两处 `el-upload` 增加 `action="#"`，与 `RegisterUploadItem.vue` 一致
- 实际请求仍走 `handleUpload`/`uploadInstitutionAppendix`，`#` 仅满足组件校验

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/331.md
- 涉及文件：src/views/institutionRegister/components/InstitutionUploadItem.vue、src/views/register/components/RegisterUploadItem.vue
- 所属项目：苏州市房地产监测V3；来源会话：7d2c6ace-ba93-4a45-988e-36327eaa2c19；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "el_upload_action_required",
  "source_extraction_id": "8eb23ada33d04411a8df7adbe568f048",
  "version": 1,
  "memory_type": "entities"
}
-->