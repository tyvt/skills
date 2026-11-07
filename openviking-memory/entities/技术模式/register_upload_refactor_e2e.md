# 企业注册上传重构对齐机构注册并添 E2E
苏州市房地产监测V3 重构 RegisterUploadItem.vue 对齐 InstitutionUploadItem，并补充 E2E 测试覆盖预览下载。

## 重构要点
- 重构 `RegisterUploadItem.vue` 对齐 `InstitutionUploadItem` 实现
- 预览走 `preview/openPreview`、下载走 `resolveServerAssetUrl`
- 添加 `data-testid` 便于 E2E 测试

## 测试补充
- 新增 `company-register-step3-appendix.spec.js` 覆盖预览与下载用例

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/153.md
- 涉及文件：zhi2-web-admin/src/views/register/components/RegisterUploadItem.vue、institutionRegister/components/InstitutionUploadItem.vue、e2e/fixtures/register-helpers.js、e2e/register/company-register-branch.spec.js、register/components/Step3Appendix.vue、e2e/company/institution-register-real-api-flow.spec.js、e2e/register/company-register-visual.spec.js、package.json
- 所属项目：苏州市房地产监测V3；来源会话：432660f8-cfe3-4a5d-b74b-1f972832c8df；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_upload_refactor_e2e",
  "source_extraction_id": "44e59d3d914d48ed86daf5e20ef46d69",
  "version": 1,
  "memory_type": "entities"
}
-->