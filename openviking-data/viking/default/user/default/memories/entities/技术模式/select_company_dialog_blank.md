# 选择机构弹窗空白因未自适应高度
在苏州市房地产监测V3中，原 `SelectCompanyDialog` 未随数据行数自适应高度导致机构注销选择弹窗空白，列表页「新增」改用 `SelectDialog.open` 打开弹窗并删除 `SelectCompanyDialog` 以消除空白。

## 问题根因
- 原 `SelectCompanyDialog` 未随数据行数自适应高度导致机构注销选择弹窗空白

## 修复方案
- 列表页「新增」改用 `SelectDialog.open` 打开弹窗
- 删除 `SelectCompanyDialog` 以消除空白

## 涉及文件
- zhi2-web-admin/src/views/company/companyCancel/index.vue
- zhi2-web-admin/src/views/company/companyCancel/components/SelectCompanyDialog.vue
- zhi2-web-admin/src/components/README.md
- zhi2-web-admin/src/views/institution/record/components/RecordCertificateDialog.vue
- 苏州市房地产监测V3/package.json
- zhi2-web-admin/package.json
- zhi2-web-admin/vite.config.js
- zhi2-web-admin/index.html

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/030.md
- 来源会话：dbc2df17-64c5-4d5a-b8ed-a9c2aaee2dce
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_company_dialog_blank",
  "source_extraction_id": "bf6db419de6c4a29b691d3709e9aa418",
  "version": 1,
  "memory_type": "entities"
}
-->