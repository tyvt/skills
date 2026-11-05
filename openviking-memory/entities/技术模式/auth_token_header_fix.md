# 接口鉴权请求头缺失修复
产品2.0 项目修复因请求未携带 Token 导致后端返回「服务器异常」的问题。

## 问题根因
- `page.request` 不会自动带上浏览器 `sessionStorage` 里的 Token，导致后端返回「服务器异常」

## 主要改动
- 在 `auth-helpers.js` 新增 `buildApiRequestHeaders(page)`：先从 Cookie 同步 `Admin-Token` 到 `sessionStorage`，再为 `page.request` 补上 `Authorization: Bearer <token>`
- 以下调用改为使用该 helper：`fetchOwnCompanyPendingInfo`、`fetchLastChangeId`、`assertCompanyPortalReady`

## 验证结果
- 完整流程 4/4 通过，用例 04 从失败变为 35s 通过

## 涉及文件与归属
- 涉及文件：`auth-helpers.js`、`e2e/fixtures/company-helpers.js`、`e2e/company/company-record-change.spec.js`
- 验证证据：extracted source=cursor project=产品2.0；来源会话：3111df9a-32f8-4a19-9e72-e8ecba17ca9c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_token_header_fix",
  "source_extraction_id": "026f3a346695401ebf51e73dd9b49605",
  "version": 1,
  "memory_type": "entities"
}
-->