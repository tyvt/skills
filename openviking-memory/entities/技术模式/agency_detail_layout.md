# 经纪机构详情页一行两列布局统一
苏州市房地产监测V3 中经纪机构管理菜单下所有需调整的详情页查看模式已统一为一行两列。

## 改动摘要
- 导出共享布局常量 HALF_LAYOUT（span:12）与 FULL_LAYOUT（span:24）于 agencyBasicInfoContent.js
- 专业资格证书、品牌管理、机构入网审核、分支机构信息等 5 个详情页 contentInfo 使用 HALF_LAYOUT
- 品牌管理 logo/备注使用 FULL_LAYOUT

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：agencyBasicInfoContent.js、personnelCertificate/detail.vue、brand/detail.vue、institutionRegister/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话ID：a842ef5b-a67e-4ebf-9a51-02e32f93dfee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_detail_layout",
  "source_extraction_id": "b4f9b8ee9a074a1f9493bbc90de9a86f",
  "version": 1,
  "memory_type": "entities"
}
-->