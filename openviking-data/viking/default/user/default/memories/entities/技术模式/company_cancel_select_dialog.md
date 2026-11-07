# 机构注销选择弹窗应使用 SelectDialog
在企业注销列表中，使用 `SelectCompanyDialog` 会导致空白弹窗；已替换为 `SelectDialog.open`。

## 问题
- 列表页的“新增”使用了 `SelectCompanyDialog` 导致空白弹窗
- 原有的 `SelectCompanyDialog` 组件已被移除

## 解决方案
- 改为调用通用的 `SelectDialog.open`，打开高度随数据行数自适应的选择弹窗

## 文件与验证
- 涉及文件: `company/companyCancel/index.vue`, `company/companyCancel/components/SelectCompanyDialog.vue`, `components/README.md`, `institution/record/components/RecordCertificateDialog.vue`, `package.json`, `vite.config.js`, `index.html`
- 验证证据: src=苏州市房地产监测V3/082.md
- 会话: dbc2df17-64c5-4d5a-b8ed-a9c2aaee2dce; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：dbc2df17-64c5-4d5a-b8ed-a9c2aaee2dce


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_select_dialog",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 1,
  "memory_type": "entities"
}
-->
