# 机构注销管理列表页入参修复
苏州市房地产监测V3 中机构注销管理列表页「机构类型」搜索条件误用 `organType`，已改为 `companyType` 并固定上下文参数。

## 问题根因
- 搜索条件「机构类型」误用了 `organType`，与后端约定不符
- `organType` 应为固定上下文参数（经纪 `agency` / 租赁 `lease`），用户筛选的机构类型应传 `companyType`

## 修复内容
- 查询参数默认值：`organType` → `companyType`
- 搜索表单字段：`model: 'organType'` → `model: 'companyType'`
- 列表请求：`organType` 固定为 `this.resolvedOrganType`（由 `CompanyOrganProvider` 或路由 meta 注入），不再从搜索条件读取
- 与机构入网列表（`companyRecordAgency/index.vue`）保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：companyCancel/index.vue、companyCancel.js、companyRecordAgency/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：50257d35-25d2-4753-bbb1-55a3c981474e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_fix",
  "source_extraction_id": "b6235e8c83234c6da6eb786bbea65930",
  "version": 1,
  "memory_type": "entities"
}
-->