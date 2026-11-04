# 附件字段名 appendixConfigCode 修正
前端误用 configAppendixCode 而后端实体为 appendixConfigCode，已在表单与 normalizeAppendixConfig 统一改为输出 appendixConfigCode 并兼容旧字段。

## 问题根因
- 前端误用 configAppendixCode，而后端实体字段为 appendixConfigCode，导致字段名不匹配

## 解决方案
- FjDialog.vue 等表单及 companyRegister.js 的 normalizeAppendixConfig 统一改为输出 appendixConfigCode
- 兼容旧字段，请求体使用 appendixConfigCode

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/api/company/companyRegister.js 与 register/components/Step3Appendix.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/tool/fjflpz/components/FjDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/register/components/RegisterUploadItem.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/benefit/components/AnnexUploadDialog/index.vue
- d:/repository/产品2.0/zhi2-web-admin/e2e/fixtures/register-mocks.js

## 验证与归属
- 验证证据：extracted source=cursor session=a81708f2-6b5e-407d-830f-ba4b0d31b6bc
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_config_code_fix",
  "source_extraction_id": "4ca9c539b6bc40068271fdd96394dd47",
  "version": 1,
  "memory_type": "entities"
}
-->