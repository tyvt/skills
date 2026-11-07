# 企业变更列表须内核薄页固定 organType 入参
苏州市房地产监测V3 中多机构变更列表未隔离查询参数致数据混淆，须内核固定 `organType` 并由薄页传参复用。

## 问题根因
- 多机构变更列表未隔离查询参数致数据混淆

## 解决方案
- 在 `companyChangeManage/index.vue` 内核增 `organType` prop（默认 `01`）
- `getList()` 固定携带 `organType` 并动态渲染标签
- 新建 `developer/agency/lease/index.vue` 入口薄页分别传参复用内核

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/308.md
- 涉及文件：companyChangeManage/index.vue、companyChangeManage/developer/index.vue、companyChangeManage/agency/index.vue、companyChangeManage/lease/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a1625f-8c84-70c5-a400-74e19978db01；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_organ_type",
  "source_extraction_id": "38445eb31c6a47e2ac30471981805d26",
  "version": 1,
  "memory_type": "entities"
}
-->