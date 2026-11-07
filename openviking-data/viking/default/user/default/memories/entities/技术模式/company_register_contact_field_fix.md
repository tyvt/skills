# 企业注册办公信息联系人字段标签修复
苏州市房地产监测V3 修复企业注册办公信息区联系人字段标签并补充 E2E 用例。

## 新增用例
- `company-register-reset.spec.js`：确认仅 1 个「企业名称」输入框且存在「联系人」字段
- 联系人留空点击下一步提示校验错误「联系人不能为空」
- 运行结果：4 passed (2.7s)

## 同步修复
- `register-helpers.js` 的 `fillStep1` 改为填写「请输入联系人」，避免全流程用例因字段变更失败
- 涉及 `Step1CompanyInfo.vue`、`companyRegister.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：0c678471-cf7f-47eb-a5c0-ed61ba99b0f8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_contact_field_fix",
  "source_extraction_id": "74dcd6685c0f46ef9abacd581112fee9",
  "version": 1,
  "memory_type": "entities"
}
-->