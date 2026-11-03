# E2E page.request 须显式补 Authorization
产品2.0 的 Playwright 用例用 page.request 直连业务接口时不会自动带 sessionStorage 的 Token，须显式注入 Authorization 头。

## 现象
- 登录态正常（storageState 注入、Cookie 有 Admin-Token、UI 操作通过），但 page.request 调接口返回「服务器异常」，用例莫名失败

## 根因
- 本项目 Token 权威存储是 sessionStorage 的 Admin-Token，page.request 是独立 HTTP 上下文，只继承 storageState/Cookie，不执行页面 JS，读不到 sessionStorage
- 缺 Authorization: Bearer <token>，网关鉴权失败被统一包装成「服务器异常」，错误信息与真实原因脱节

## 修复做法
- 在 e2e/fixtures/auth-helpers.js 收口 buildApiRequestHeaders(page)：先 page.evaluate 从 sessionStorage 读 Admin-Token（必要时先从 Cookie 同步一份到 sessionStorage 再读），拼成 { Authorization: `Bearer ${token}` }
- 所有 page.request.* 调用统一传入该 header（合并 options.headers），不各页各写一份

## 排查口诀
- E2E 走接口拿到「服务器异常」而同账号 UI 操作正常 → 先核对请求头有无 Token，而非翻业务数据或报工单

## 验证与归属
- 会话 3111df9a：用户反馈接口返回异常，新增 buildApiRequestHeaders(page) 并让 fetchOwnCompanyPendingInfo/fetchLastChangeId/assertCompanyPortalReady 统一使用；修复后完整流程 4/4 通过，用例 04 从失败变 35s 通过
- 涉及文件：e2e/fixtures/auth-helpers.js、e2e/fixtures/company-helpers.js、e2e/company/company-record-change.spec.js
- 所属项目：产品2.0；来源会话：3111df9a-32f8-4a19-9e72-e8ecba17ca9c；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "e2e_auth_header",
  "source_extraction_id": "7d247f9850784ea7a807d834ba19fc05",
  "version": 1,
  "memory_type": "entities"
}
-->