# 开发企业注册要件上传预览下载修复与E2E验收
苏州市房地产监测V3中完成开发企业注册Step3要件上传预览/下载修复并通过E2E验收。
## 前端修复
- 重构 RegisterUploadItem.vue，对齐机构注册 InstitutionUploadItem
- 每个已上传文件独立一行，显示类型图标+文件名
- 操作区：删除|预览|下载|上传；预览图片走 preview/openPreview 弹窗，其他格式 window.open；下载通过 resolveServerAssetUrl 解析 fileSite 触发
- 增加 data-testid="register-btn-preview"/"register-btn-download" 便于E2E定位
## E2E测试
- 新增 company-register-step3-appendix.spec.js，4个用例全部通过
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：RegisterUploadItem.vue、company-register-step3-appendix.spec.js、InstitutionUploadItem.vue
- 所属项目：苏州市房地产监测V3；来源会话：432660f8-cfe3-4a5d-b74b-1f972832c8df；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_upload_fix",
  "source_extraction_id": "212c18051ff547cab1b52f1f1e9fd4df",
  "version": 1,
  "memory_type": "entities"
}
-->