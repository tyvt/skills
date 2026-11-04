# 机构注销列表应使用 companyType
注销列表中的“机构类型”搜索条件错误地使用了 organType；后端要求使用 companyType 作为用户筛选条件。

## 问题根因
- 机构注销列表在机构类型筛选中使用了 organType
- organType 是固定上下文（agency/lease）；用户筛选应传递 companyType

## 解决方案
- companyCancel/index.vue: 查询参数和搜索表单已改为 companyType
- 列表请求将 organType 固定为 this.resolvedOrganType（通过 CompanyOrganProvider 或路由 meta）
- 行为与 companyRecordAgency/index.vue 保持一致

## 涉及的文件
- src/views/company/companyCancel/index.vue 和 detail.vue
- src/api/company/companyCancel.js 和 src/mixins/companyOrganContext.js
- src/views/zljg/companyCancel/index.vue 和 src/views/company/companyRecordAgency/index.vue
- src/constants/companyOrgan.js 和 e2e/list/list-card-spacing.spec.js

## 验证
- 验证证据: src=苏州市房地产监测V3-leftover/058.md; 会话: 50257d35-25d2-4753-bbb1-55a3c981474e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_companytype",
  "source_extraction_id": "2ad82671c0ec46a89bf7f8171f0d0fa6",
  "version": 1,
  "memory_type": "entities"
}
-->