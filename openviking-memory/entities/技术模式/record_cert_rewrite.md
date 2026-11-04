# 带背景图的登记证书对话框重写
在 苏州市房地产监测V3 项目中，`RecordCertificateDialog.vue` 已根据设计重写，移除了旧表格并使用了横向A4背景图的证书样式。

## 问题根因
- 原始的 `RecordCertificateDialog.vue` 使用了旧的表格布局和字典逻辑 `company_certificate_level` 以及经纪人表格，不符合设计

## 解决方案
- 使用横向A4背景图的证书样式重写 `RecordCertificateDialog.vue`
- 移除旧的表格布局、逻辑 `company_certificate_level` 和经纪人表格
- 将字段 `recordTermEnd` 和 `recordTime` 映射并格式化为 `YYYY年MM月DD日`
- 登记机构固定为 苏州市住房和城乡建设局

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/004.md
- 涉及文件: RecordCertificateDialog.vue, institution/record/index.vue, api/company/companyApply.js, companyApplyAudit/detail.vue, 前端技术信息.md
- 所属项目: 苏州市房地产监测V3; 会话: c0e6e780-7c64-4045-ac06-51b5d3a2354a; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_cert_rewrite",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->