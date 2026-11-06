# 候选征集报名信息区块显隐控制
修复园区公共收益项目筹备组征集与业委会征集详情页新增保存后报名信息显隐逻辑，统一要求已备案才显示。
## 修改说明
- `detail.vue` 新增计算属性 `showCandidateTable`：新增模式不显示
- 筹备组征集（PREPARATORY_GROUP + COLLECT）仅 `bizState == 2`（已备案）时显示
- 业委会征集等所有「候选人征集」（COLLECT）类型统一要求 `bizState == 2` 才显示 CandidateTable
- 模板中 CandidateTable 的 `v-if` 从 `formMode != 'add'` 改为 `showCandidateTable`
- `CandidateTable.vue` 同步报名管理权限：已备案且在征集期内才可新增/编辑报名
## 效果
- 选择筹建申请并自动保存后详情页只显示基本信息，不显示「报名信息」
- 待提交、审核中阶段同样隐藏，备案通过后 `getDetail` 刷新 `bizState` 变为 2 报名信息自动出现
- 业委会征集、筹备组候选人确认等场景按上述规则对齐
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/candidateCollect/components/detail.vue、CandidateTable.vue
- 所属项目：园区公共收益；来源会话：4686b4cc-9df1-4168-a0c5-e5e69fe7b2df、37dbc28a-32eb-4a0c-a154-c7353dc061f8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_collect_table_visibility",
  "source_extraction_id": "d911a1df7ac94bea8711193041fef28e",
  "version": 1,
  "memory_type": "entities"
}
-->