# 企业变更列表内核须固organType拆薄页
苏州市房地产监测V3 中多机构复用变更列表未隔离 organType 致查询与展示混淆，需内核固化并拆薄页分发。

## 问题根因
- 多机构复用同一变更列表未隔离 `organType`
- 导致查询与展示混淆

## 解决方案
- `src/views/company/companyChangeManage/index.vue` 内核新增 `organType` prop（默认 `01`）
- `getList()` 固定携带参数并切换标签
- 新增 `developer/`、`agency/`、`lease/index.vue` 入口薄页分发

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/108.md
- 涉及文件：companyChangeManage/index.vue、developer/index.vue、agency/index.vue、lease/index.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：01a1625f-8c84-70c5-a400-74e19978db01；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_organ_type",
  "source_extraction_id": "db8ea7dbd9be4e8bab0f903cf2e33840",
  "version": 1,
  "memory_type": "entities"
}
-->