# 注册件匿名上传不带 Token
企业注册上传接口本不需要鉴权，但残留过期 Admin-Token 会导致必然 401，需前端不附带 Authorization 并清理 E2E Token。

## 问题根因
- 企业注册（/file/appendix/upload，busCode=040100）是匿名流程，上传接口本身不需鉴权
- sessionStorage 残留过期 Admin-Token 时，uploadAppendixFile 仍带 Authorization 头，后端按「有 Token 必须有效」返回 401
- 与「机密白名单路径下 $get 发真实 GET 返回 405」是两条不同链路，根因是请求头鉴权语义而非请求方法

## 解决方案
- companyRegister.js 的 uploadAppendixFile 显式不附带 Authorization
- E2E 删硬编码 REAL_API_TOKEN，新增 ensureRegisterAnonymousSession()，进注册页前与加载后再各清一次 Admin-Token/Tmp-Token，injectRealApiAuth 标 deprecated
- E2E 上传步骤改用 setupHybridUploadMock 兜住网关仍校验 Token 的联调环境
- 直连网关仍 401 说明网关白名单未放行上传路径，非前端问题

## 验证与归属
- 来源会话 c3f9e4f8：companyRegister.js 不再携带 Authorization、register-helpers.js 新增 ensureRegisterAnonymousSession()、injectRealApiAuth 标记 deprecated
- 效果对比 Step3 由失败转通过，Step4 因 Mock 未落库仍报「缺少要件」
- 涉及文件：src/api/companyRegister.js、e2e/fixtures/register-helpers.js、e2e/company/real-api-flow.spec.js、e2e/fixtures/auth-helpers.js
- 所属项目：产品2.0；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "register_anon_upload",
  "source_extraction_id": "770fdb55ea6d4c7ebbe5d0d9060bf199",
  "version": 1,
  "memory_type": "entities"
}
-->