# 一手房交易提交接口 firstHandHouseSubmit
`zhi2-mobile-shimin` 项目中交易申请页（新房认证详情页）点击「确认提交」时调用的提交接口。

## 接口契约
- 方法：POST
- 路径：`/transaction/firstHandHouse/submit`
- 请求实例：`apiV1`（来自 `@/api/transaction`）
- 导出函数：`firstHandHouseSubmit(data)` 定义于 `src/api/transaction.js:361-363`

## 调用链路
- 页面：`pages_transaction/newHouseCertification/detail.vue` 第 216 行调用 `firstHandHouseSubmit({ ...this.form })`
- 请求体：整个 `form`，字段含 `contractNumber`、`securityCode`、`region`、`buyerName`、`idNumber`

## 响应处理
- 根据 `res.result.isCompleted` / `res.result.code` 决定跳转成功页或弹错误提示
- 错误码 001–099、ERR-1~3 见页面内 `errors` 映射

## 归属
- 所属项目：zhi2-mobile-shimin（苏找房市民H5）；来源会话：2026-11-04

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "firstHandHouseSubmit",
  "source_extraction_id": "2f8162bace3e48cf9f92cdd1b99ef4a6",
  "version": 1,
  "memory_type": "entities"
}
-->