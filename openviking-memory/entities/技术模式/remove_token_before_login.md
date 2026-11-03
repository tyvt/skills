# 返回登录页前清除 Token
机构注册等流程中「返回首页」「取消」回到登录页时，应先 removeToken 再 router.replace，避免残留 token。

## 问题背景
- 返回首页/取消回到登录页若直接用 window.location.href="/" 会残留 token。
- 残留 token 可能导致权限或页面状态异常。

## 解决方案
- import { removeToken } from "@/utils/auth" 执行 removeToken()。
- 再 this.$router.replace({ path: "/login" })。
- 不要用 window.location.href="/" 以免残留 token。

## 验证与归属
- 验证：返回首页回到登录页面清除 token，zhi2-web-admin companyRegister.vue / accountInfo.vue。
- 涉及文件：zhi2-web-admin/src/views/register/companyRegister.vue；zhi2-web-admin/src/views/register/components/accountInfo.vue。
- 来源会话：003-cleartoken；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_token_before_login",
  "source_extraction_id": "ec03f1a8ff9a4f548b9232380e7504fa",
  "version": 1,
  "memory_type": "entities"
}
-->