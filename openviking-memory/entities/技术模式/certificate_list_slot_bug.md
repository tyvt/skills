# 证书管理操作列插槽未解构致字段未定义
苏州市房地产监测V3 中证书管理操作列插槽未使用 `slot-scope="{scope}"` 解构，点击查看/编辑时 `certificateType` 未定义。

## 问题根因
- 证书管理操作列插槽未使用 `slot-scope="{scope}"` 解构写法
- 点击查看/编辑时 `certificateType` 未定义，引发异常

## 解决方案
- 改为解构写法 `slot-scope="{scope}"` 以消除异常

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/117.md
- 涉及文件：projectEmbeddedCertificateList.js、ProjectCertificateTabs.vue、ProjectCertificateDetailDialog.vue、certificatePanelDetailMixins.js、unionCertificate.js、detail.vue、ProjectStateLandLicPanel.vue、projectCertificatePanelMixin.js
- 所属项目：苏州市房地产监测V3；来源会话：ae9794fd-fcc0-4677-a413-4453cc799763；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_list_slot_bug",
  "source_extraction_id": "43a56e1135f54aee8434303afd94ddab",
  "version": 1,
  "memory_type": "entities"
}
-->