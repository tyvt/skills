# 企业注册自动化测试匿名Token处理
产品2.0 的 zhi2-web-admin 企业注册自动化测试已按「注册附件上传不带 Token」处理，避免过期 Token 导致 401。

## 改动
- 前端 companyRegister.js：uploadAppendixFile 不再携带 Authorization 头（企业注册为匿名流程）
- E2E register-helpers.js：删除硬编码过期 REAL_API_TOKEN；新增 ensureRegisterAnonymousSession()（进入注册页前清除 Admin-Token / Tmp-Token）；gotoRegister() 加载后再次清除残留 Token；injectRealApiAuth 标记 deprecated
- E2E real-api-flow.spec.js：用 clearAuthStorage + ensureRegisterAnonymousSession 替代 injectRealApiAuth；Step3 上传沿用 setupHybridUploadMock

## 验证与归属
- 涉及文件：companyRegister.js、register-helpers.js、real-api-flow.spec.js
- 所属项目：产品2.0；来源会话：c3f9e4f8-0f4c-49cd-ab93-f6b6ee988f87；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "register_anon_test",
  "source_extraction_id": "ce7689f8bffb4226a4a239088e1262fc",
  "version": 1,
  "memory_type": "entities"
}
-->