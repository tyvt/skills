# 产品2.0 企业注册附件上传接口改造
产品2.0 企业注册流程中的附件上传接口已统一替换为 `/file/appendix/uploadAnonymous`。

## 核心修改
- `src/api/company/companyRegister.js` 的 `uploadAppendixFile` 函数改为 `xhr.open('POST', `${import.meta.env.VITE_APP_BASE_API}/file/appendix/uploadAnonymous`)`
- `Step3` 要件上传组件 `RegisterUploadItem` 通过该函数调用接口

## 同步更新
- `e2e/fixtures/register-mocks.js`：mock 路由匹配
- `e2e/fixtures/register-helpers.js`：混合上传 mock 与响应等待

## 不在范围内
- 管理后台详情页营业执照上传仍使用 `ImageUpload` 组件（`/file/file/upload`），属已登录管理端场景，不在本次匿名注册流程范围

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`src/api/company/companyRegister.js`、`e2e/fixtures/register-mocks.js`、`e2e/fixtures/register-helpers.js`
- 所属项目：产品2.0；来源会话：70beb6e7-0c07-4d5a-ae9a-5eb0f078c15d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_appendix_upload_refactor",
  "source_extraction_id": "2658e67cf6ca4db888ef45ede55a20f8",
  "version": 1,
  "memory_type": "entities"
}
-->