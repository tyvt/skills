# 企业注册附件的匿名上传
企业注册附件的上传是一个匿名流程，不需要认证；前端不应发送 Authorization，并且应清除 E2E tokens。

## 问题根因
- 企业注册上传接口 (`/file/appendix/uploadAnonymous`, busCode=040100) 是匿名的，不需要认证。
- 当 sessionStorage 中存在残留的过期 Admin-Token 时，`uploadAppendixFile` 仍然发送 Authorization 请求头，后端返回 401（“令牌必须有效”）。
- 这与在 secret whitelist 路径上返回 405 的 `$get` 链不同；原因是请求头中的认证语义，而非请求方法。
- 管理后端中的商业许可证上传使用 `/file/file/upload`，不在本次修复范围内。

## 解决方案
- `companyRegister.js` 应将 `xhr.open` 修改为 `/file/appendix/uploadAnonymous`，且 `uploadAppendixFile` 不显式发送 Authorization。
- `RegisterUploadItem` 的 `Step3` 及相关组件（bankTable.vue, dialog.vue, index.vue, ImageUpload/index.vue, Step3Appendix.vue）调用此接口；E2E `e2e/fixtures/register-mocks.js` 已同步。
- E2E 移除硬编码的 token REAL_API_TOKEN，添加 `ensureRegisterAnonymousSession()`，在进入前和加载后清除 Admin-Token/Tmp-Token；`injectRealApiAuth` 标记为 deprecated。
- E2E 使用 `setupHybridUploadMock` 用于仍在网关中验证 token 的环境。
- 如果直连网关仍返回 401，表明网关的 whitelist 未放开上传路径，不是前端问题。

## 验证与归属
- 会话 c3f9e4f8: companyRegister.js 无 Authorization，register-helpers.js 包含 ensureRegisterAnonymousSession()，injectRealApiAuth 已废弃。
- 会话 70beb6e7: 调整至端点 `/file/appendix/uploadAnonymous`，涉及文件如列表所示。
- 效果：Step3 由失败转为成功；Step4 仍报告“缺少要求”因为 Mock 未持久化。
- 涉及文件: src/api/company/companyRegister.js, e2e/fixtures/register-helpers.js, e2e/company/real-api-flow.spec.js, e2e/fixtures/auth-helpers.js, e2e/fixtures/register-mocks.js, views/company/companyRegister/*, views/register/components/*.
- 所属项目: 产品 2.0; baseline: 5169909; 证据: 产品2.0/062.md.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia do Produto 2.0",
  "name": "register_anon_upload",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 2,
  "memory_type": "entities"
}
-->