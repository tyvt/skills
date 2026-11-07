# 证书操作列插槽未解构致字段未定义报错
苏州市房地产监测V3中证书管理操作列插槽改为解构写法，解决certificateType未定义报错。

## 问题根因
- 证书管理操作列插槽未解构，点击查看/编辑时 certificateType 未定义报错

## 修复方案
- 操作列插槽改为 slot-scope="{scope}" 解构写法

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/161.md
- 涉及文件：projectManagement/customerProject/mixins/projectEmbeddedCertificateList.js、components/ProjectCertificateTabs.vue、components/ProjectCertificateDetailDialog.vue、mixins/certificatePanelDetailMixins.js、api/certificate/unionCertificate.js、detail.vue、components/certificate/ProjectStateLandLicPanel.vue、mixins/projectCertificatePanelMixin.js
- 所属项目：苏州市房地产监测V3；来源会话：ae9794fd-fcc0-4677-a413-4453cc799763；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_slot_undefined",
  "source_extraction_id": "a80b2fd6890746ea80eb4641c8c2c4f9",
  "version": 1,
  "memory_type": "entities"
}
-->