# 经纪机构管理员详情缺失真实主键修复
苏州市房地产监测V3 项目中，列表点「查看」进入经纪机构管理员详情时未携带真实业务主键，导致详情页误取模块段为 ID。

## 根因
- 列表点「查看」走 `buildDetailNavigation`，命名详情路由 `company/companyAdmin/agency/detail` 路径无 `:tableid`
- 跳转 `query` 仅含 `formMode`、`backUrl`，未带真实主键
- 详情页 `getDetail()` 用全局 `getId()` 从 URL 路径段推断，误将模块段 `companyAdmin` 当作 `companyAdminId`，请求体变成 `companyAdminId: "companyAdmin"`

## 修复方案
- 在 `buildDetailNavigation` 中，当 `rowId` 为合法业务主键时写入 `query.id`
- 与 `getId()` 优先读 `query.id` 的约定保持一致

## 涉及文件与归属
- 涉及文件：`src/utils/ruoyi.js`（463:470）、`src/views/company/companyAdmin/index.vue`、`src/mixins/listMixins.js`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "build_detail_id_fix",
  "source_extraction_id": "e1e0f290fc1e43a8b372bd273c07a27c",
  "version": 1,
  "memory_type": "entities"
}
-->