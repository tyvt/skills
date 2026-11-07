# 一般表决列表业务类型字典过滤修复
惠山二期G 后台一般表决列表因 initDict 排除 '0' 致业务类型显示为空，改为仅排除 ['2'] 走完整字典。

## 问题根因
- 列表页 initDict 过滤排除 '0'，formatter 无对应 label 显示空。
- autonomy/general/index.vue 列原未用 type:'dict' 走完整字典 decision_business_type。

## 解决方案
- autonomy/general/index.vue 列改 type:'dict' 走完整字典 decision_business_type。
- initDict 过滤条件改为仅排除 ['2']。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证证据：src=惠山二期G/007.md
- 涉及文件：zhi2-web-admin/src/views/autonomy/general/index.vue、autonomy/general/detail.vue、autonomy/election/components/vote/enums.js、maintenance/maintenanceApply/components/VoteTable.vue、autonomy/repair/detail.vue、autonomy/repair/index.vue、autonomy/option/index.vue、package.json
- 所属项目：惠山二期G；来源会话：24864aca-3eff-4a2b-8d94-e4ce7b40b21d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_vote_filter",
  "source_extraction_id": "e65d0db6f82a47e2b9b2a6cb82142971",
  "version": 1,
  "memory_type": "entities"
}
-->