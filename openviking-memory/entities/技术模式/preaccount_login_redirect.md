# 预账号(isPreAccount)登录后跳转续填并改用 editAndSubmit
机构注册预账号流程在第一步成功后重定向登录，登录后判断预账号跳转续填，最后提交接口改为 editAndSubmit。

## 流程要点
- 第一步 saveCompanyRegister 成功后不再写 sessionStorage/nextStep，而是提示并 router.replace("/login")。
- 登录成功（LoginForm）在 setToken 后判断 isPreAccount==="1" 且有 companyRegisterId 时跳转 /companyRegister?step=2&companyRegisterId=xxx，否则进首页。
- 最后一步提交接口改为 /company/companyRegister/editAndSubmit。
- 原 accountInfo 数据由 /company/companyRegister/{companyRegisterId} 回显。

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 验证：会话 f3561464（008.md）accountInfo 提交后重定向登录，预账号跳 step=2 续填。
- 涉及文件：zhi2-web-admin/src/views/register/components/accountInfo.vue、zhi2-web-admin/src/views/login/LoginForm.vue、zhi2-web-admin/src/views/register/components/companyRegister.vue、zhi2-web-admin/src/views/register/components/companyInfo.vue
- 所属项目：repository
- 来源会话ID：f3561464-54e7-471b-929f-2579c20beca8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "preaccount_login_redirect",
  "source_extraction_id": "2b613728a85544a581e8279650d99ee9",
  "version": 2,
  "memory_type": "entities"
}
-->