# 机构注册第二步必填项调整
苏住房G 项目 companyInfo.vue 在机构注册第二步为 6 个字段新增 required:true 校验。

## 修改内容
- 在 companyInfo.vue 的 rules 中为经营范围、机构介绍、办公地址、项目负责人、负责人电话、办公电话新增 required:true
- 错误提示为「XX不能为空」形式
- 传真号码(fax)无校验规则；电子邮箱(email)仅格式校验非必填；开户行信息(companyRegisterBankList)主表单不强制至少一条

## 验证与归属
- 验证：无 linter 报错、前端构建通过(exit code 0)、模板字段已有对应 prop 自动显示红色 * 并拦截空值
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/register/components/companyInfo.vue
- 来源会话ID：83b92882-9c0f-4f73-81af-8089218f93a0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "companyinfo_required_fix",
  "source_extraction_id": "67bb936ad3174282b6da54bbc95568da",
  "version": 1,
  "memory_type": "entities"
}
-->