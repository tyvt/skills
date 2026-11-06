# 经纪机构备案证书弹窗改版
苏州市房地产监测V3 完成经纪机构备案证书弹窗改版，重写 `RecordCertificateDialog.vue` 按设计稿实现正式证书样式。

## 改动文件
- 新增 `zhi2-web-admin/src/assets/images/record-certificate-bg.jpg` — 设计稿背景图
- 重写 `RecordCertificateDialog.vue` — 按设计稿实现正式证书样式

## 弹窗效果与移除项
- 横向 A4 比例证书容器使用背景图；标题「苏州市房地产经纪机构备案证书」，右上「备案证书编号」
- 6 个字段：机构名称、统一社会信用代码、法定代表人、经营地址、备案业务范围、备案有效期限
- 右下：备案机关（固定）、发证日期、盖章占位；底部监制/印制文案；斜向重复水印
- 已移除旧表格布局、「备案经纪人」表格、`company_certificate_level` 字典相关逻辑

## 字段映射
- 备案有效期限：`recordTermEnd` → `YYYY年MM月DD日`
- 发证日期：`recordTime` → `YYYY年MM月DD日`
- 备案业务范围：`businessScope`
- 备案机关：固定「苏州市住房和城乡建设局」

## 涉及文件与归属
- 涉及：`RecordCertificateDialog.vue`、`institution/record/index.vue`、`companyApplyAudit/detail.vue`、`src/api/company/companyApply.js`
- 所属项目：苏州市房地产监测V3；来源会话：c0e6e780-7c64-4045-ac06-51b5d3a2354a
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_cert_dialog_rebuild",
  "source_extraction_id": "b6820f9cb17546e1b9b6efc01324a33b",
  "version": 1,
  "memory_type": "entities"
}
-->