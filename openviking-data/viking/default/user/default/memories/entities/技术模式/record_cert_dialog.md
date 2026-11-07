# 备案证书弹窗重写弃表格改背景图样式
苏州市房地产监测V3 的 RecordCertificateDialog.vue 因设计稿要求重写为 A4 比例背景图证书样式，移除旧表格布局。

## 变更要点
- 引入 `zhi2-web-admin/src/assets/images/record-certificate-bg.jpg` 背景并实现 A4 比例证书样式
- 移除旧表格布局与 `company_certificate_level` 字典逻辑
- 将 `recordTermEnd`、`recordTime` 等 API 字段格式化为 `YYYY年MM月DD日` 展示

## 涉及文件
- zhi2-web-admin/src/views/institution/record/components/RecordCertificateDialog.vue
- zhi2-web-admin/src/views/institution/record/index.vue
- zhi2-web-admin/src/api/company/companyApply.js
- zhi2-web-admin/src/views/company/companyApplyAudit/detail.vue
- 前端技术信息.md

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/202.md
- 来源会话：c0e6e780-7c64-4045-ac06-51b5d3a2354a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_cert_dialog",
  "source_extraction_id": "8d3358f862fa431d858799b297104461",
  "version": 1,
  "memory_type": "entities"
}
-->