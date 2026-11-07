# 开发企业入网认证详情请求修复
苏州市房地产监测V3 中开发企业入网认证页因 formMode 落成 add 导致详情接口未请求，已在 created/activated 调用 getEntryNetworkDetail 修复。

## 问题根因
- 企业入网菜单路由多为 `/kfqy/companyRecord`（无 `tableid`），全局 `formMode` 落为 **`add`**
- `detailMixins` 仅在 **`view`** 时调 `init()`，导致 `POST /company/companyRecord/entryNetwork/detail` 未发，页面全显示 `-`

## 修复内容
- 在 `DeveloperBasicInfoDetail` 的 `created` 及 `keep-alive` 的 `activated` 中，入网认证页调用 `getEntryNetworkDetail()`（企业端不传 `companyRecordId`）
- 合并并发请求：短时间重复进入/刷新共用同一请求，避免重复调 detail
- 解析 `EntryNetworkDetailVo`：优先 `data.companyRecord`，否则顶层字段并排除 `qualificationList` 等，避免塞入企业主表

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：前端联调文档-开发企业入网.md、zhi2-web-admin、zhi2-web-admin/src/views/company/institutionRegister/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：3ec7aa54-6427-4d87-9697-2963bbe64ad2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entry_detail_fix",
  "source_extraction_id": "0c115a7a4e2d4c988b4d8dbe0f854d96",
  "version": 1,
  "memory_type": "entities"
}
-->