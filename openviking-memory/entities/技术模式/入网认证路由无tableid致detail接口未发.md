# 入网认证路由无tableid致detail接口未发
入网认证路由缺少 tableid 导致详情接口未请求，页面显示异常，已通过判页调接口修复。

## 缺陷描述
- 根因：`/kfqy/companyRecord` 路由无 `tableid` 使全局 `formMode` 为 `add`
- `detailMixins` 仅在 `view` 调 `init()`，导致 `POST /company/companyRecord/entryNetwork/detail` 未请求
- 页面显示 `-` 因详情数据缺失

## 修复方案
- `DeveloperBasicInfoDetail` 的 `created` 及 `activated` 中判入网认证页则调 `getEntryNetworkDetail()`
- 企业端不传 `companyRecordId`，合并并发请求
- 解析 `EntryNetworkDetailVo` 优先取 `data.companyRecord` 并排除 `qualificationList`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/002.md
- 涉及文件：前端联调文档-开发企业入网.md、institutionRegister/detail.vue、toB/companyRecord/detail.vue、developerBasicInfoContent.js、DeveloperBasicInfoDetail.vue、CompanyRegisterSingleForm.vue、companyRecord.js、DeveloperBasicInfoForm.vue
- 来源会话ID：3ec7aa54-6427-4d87-9697-2963bbe64ad2
- 代码基线：none
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "入网认证路由无tableid致detail接口未发",
  "source_extraction_id": "cbc19062b1a94d06817b4cb8938004dd",
  "version": 1,
  "memory_type": "entities"
}
-->