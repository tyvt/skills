# 经纪机构证书联系电话非必填仅格式校验
personnelCertificate/detail.vue 中 phone 校验移除必填，仅保留格式校验，实现非必填且留空放行。

## 问题根因
- personnelCertificate/detail.vue 中 phone 字段原配置 required: true，强制必填

## 修复方案
- 移除 required: true，仅保留 patterns.contactPhone 正则格式校验
- 实现联系电话非必填且留空放行

## 验证与归属
- staffManagement 下证书弹窗无联系电话字段，故无需改动
- 验证证据：src=苏州市房地产监测V3/322.md
- 涉及文件：personnelCertificate/detail.vue、staffManagement/components/certificatesDialog.vue
- 所属项目：苏州市房地产监测V3
- 来源会话ID：ec28a610-b81f-46da-83fd-dca3dbf806da
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "cert_phone_optional",
  "source_extraction_id": "2a864028af814491ba471786ba13e88c",
  "version": 1,
  "memory_type": "entities"
}
-->