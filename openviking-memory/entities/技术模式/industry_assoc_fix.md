# INDUSTRY_ASSOCIATION 字典转写修复
苏州市房地产监测V3 中机构备案详情页行业协会组织未转写字典名称，已接入 INDUSTRY_ASSOCIATION 字典并兼容数值比较。

## 修复内容
- companyApplyAudit/detail.vue 新增 industryAssociationOptions、created 加载字典、industryAssociationLabel 方法（String() 比较兼容 5 与 '5'）
- institutionRegister/detail.vue 加载字典并在 displayValue 增加 industryAssociation 转写，dictLabel 改 String() 比较

## 验证与归属
- 刷新机构备案详情页后「行业协会组织」显示字典名称
- 涉及文件：companyApplyAudit/detail.vue、institutionRegister/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：a2724dfa-738f-4f54-bbf4-4303a1e6cf98

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "industry_assoc_fix",
  "source_extraction_id": "78f87c11712447268d552847ce02e222",
  "version": 1,
  "memory_type": "entities"
}
-->