# 机构注册第二步六字段缺必填校验
机构注册第二步表单核心字段未配置必填校验，致空值可提交。

## 问题现象
- 机构注册第二步表单核心字段未配置必填校验
- 用户可提交空值，数据完整性受损

## 解决方案
- 在 register/components/companyInfo.vue 的 rules 中为经营范围、机构介绍、办公地址、项目负责人、负责人电话、办公电话新增 required: true
- 传真、电子邮箱及开户行信息维持选填

## 验证与归属
- 验证证据：苏住房G/070.md
- 涉及文件：register/components/companyInfo.vue、company/companyRegister/dialog.vue、patterns/index.js
- 所属项目：苏住房G；来源会话ID：83b92882-9c0f-4f73-81af-8089218f93a0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_required_fields",
  "source_extraction_id": "62aa50b1d31141a59681e1090dfd286d",
  "version": 1,
  "memory_type": "entities"
}
-->