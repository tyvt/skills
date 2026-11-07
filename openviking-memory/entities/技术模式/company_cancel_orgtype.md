# 取消列表中的 organType 参数错误
视图 companyCancel/index.vue 使用 organType 作为机构类型的筛选条件，但 organType 是固定的上下文参数（agency/lease）；用户的筛选条件应传递 companyType。

## 问题根因
- 在搜索和表单中错误地将 `organType` 用作机构类型
- `organType` 是固定的上下文参数（`agency`/`lease`），而非用户筛选条件

## 修正
- 查询参数和表单字段已更改为 `companyType`
- 列表请求使用来自 `this.resolvedOrganType` 的固定 `organType`（CompanyOrganProvider 或路由 meta），与 `companyRecordAgency/index.vue` 保持一致

## 验证与文件
- 验证证据: src=苏州市房地产监测V3/258.md
- 涉及文件: zhi2-web-admin/src/views/company/companyCancel/index.vue, src/api/company/companyCancel.js, zhi2-web-admin/src/views/zljg/companyCancel/index.vue, src/mixins/companyOrganContext.js, companyRecordAgency/index.vue, companyCancel/detail.vue, e2e/list/list-card-spacing.spec.js, src/constants/companyOrgan.js
- 所属项目: 苏州市房地产监测V3; 会话: 50257d35-25d2-4753-bbb1-55a3c981474e

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：50257d35-25d2-4753-bbb1-55a3c981474e


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_orgtype",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->
