# 注册e2e定位修复
苏州市房地产监测V3 修复 register-helpers.js 中与 Step1 表单不一致的定位，e2e 测试 6/6 通过。

## 修复内容
- Step1 可输入字段由原「办公企业名称」改为与页面一致的「联系人」（`placeholder="请输入联系人"`）
- 资质内联表单 scope 设为 `register-qualification-form`，改为在 scope 内直接用 `s.locator('input[placeholder=...]')`

## 涉及文件
- `e2e/fixtures/register-helpers.js`
- `e2e/register/company-register-fields.spec.js`
- `src/views/register/components/Step1CompanyInfo.vue`
- `src/views/register/companyRegister.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：417eac43-30d4-48c7-97e2-73f5e4d9cdd0
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- `e2e/register/company-register-fields.spec.js` 现已 6/6 通过

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "注册e2e定位修复",
  "source_extraction_id": "bc333e267c694093a81f44f983e968d6",
  "version": 1,
  "memory_type": "entities"
}
-->