# 共有资金明细接口路径含statistics段
getAccountFundDetail 请求路径须为 POST /benefit/app/accountStatistics/statistics/accountFundDetail，旧路径少 /statistics 会 404。

## 接口约定
- 请求路径：POST `/benefit/app/accountStatistics/statistics/accountFundDetail`
- 明细页「类型」条件字典：benefit_app_account_fund_type
- 类型下拉选项直接赋字典返回值，禁止前端手动 prepend ALL_FUND_TYPE_OPTION 或过滤后拼接，避免「全部共有资金」重复（验证会话 c3697b27）
- 总览块仍用 `/benefit/app/accountStatistics/{projectId}` 与 bankReceiptDetail 等字段约定

## 验证与归属
- 验证会话：2ef3a945-8783-45dc-882c-71a6f4dc772e、c3697b27-3a83-450d-a4a0-5c2a22ae4a0e、0d2c6516-1930-4d19-b020-1182a8c885bb
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/api/sharedFunds.js、src/pages_benefit/sharedFunds/components/DetailsTab.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：ffd97b8

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "account_fund_detail_path",
  "source_extraction_id": "dc39a6e5b671492c87b68671b8c83d92",
  "version": 3,
  "memory_type": "entities"
}
-->