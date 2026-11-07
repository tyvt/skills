# 企业入网确认详情页移除股东信息
苏州市房地产监测V3 的企业入网确认详情页已移除「股东信息」区块，仅保留法人信息。

## 改动要点
- 删除 detail.vue 中「股东信息」Headline 及表格
- 删除 ShareholderDialog 及相关 data、computed、methods
- 删除股东字典加载与 shareholderList 数据处理

## 测试验证
- E2E：company-register-admin-helpers.js 断言仅保留法人信息且「股东信息」不再展示
- company-register.spec.js 同步更新调用方式
- 当前详情页结构：基本信息 → 办公信息 → 法人信息 → 要件上传

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/company/companyRegister/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：afc7fb85-765b-420b-b678-2404699727de；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_shareholder_remove",
  "source_extraction_id": "15c5db80af5a4cc68efbfcf5a6974f2c",
  "version": 1,
  "memory_type": "entities"
}
-->