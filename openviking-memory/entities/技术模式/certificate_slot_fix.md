---
audit_status: valid
last_checked: 2026-11-27T21:54:39+08:00
verdict_note: projectEmbeddedCertificateList.js 存在且用 slot-scope 解构，证书操作列修复属实
---
# 证书管理操作列报错修复
苏州市房地产监测V3 中证书管理操作列点击查看/编辑报 `certificateType` 未定义，已修复。

## 改动内容
- `projectManagement/customerProject/mixins/projectEmbeddedCertificateList.js`：证书管理操作列插槽改为 `slot-scope="{scope}"` 解构写法，解决点击查看/编辑时的 `certificateType` 未定义报错

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/projectManagement/customerProject/mixins/projectEmbeddedCertificateList.js
- 所属项目：苏州市房地产监测V3；来源会话ID：ae9794fd-fcc0-4677-a413-4453cc799763；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_slot_fix",
  "source_extraction_id": "3891d95391874d31a54dc15319f2aa38",
  "version": 1,
  "memory_type": "entities"
}
-->