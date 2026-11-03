# 业委会候选人征集冗余展示候选人类型字段
业委会候选人征集（businessType='0'）无需展示「候选人类型」，需在弹窗与表格中隐藏并强制 identityFlag='0'。

## 问题根因
- 业委会候选人征集 businessType='0' 时，CandidateDialog.vue 与 CandidateTable.vue 仍展示「候选人类型」字段，属冗余
- 弹窗打开与提交未强制 identityFlag='0'，可能导致数据不一致

## 解决方案
- 于 CandidateDialog.vue 与 CandidateTable.vue 隐藏「候选人类型」字段
- 弹窗打开与提交时强制写入 identityFlag='0'
- 同步调整 enums.js 与 MemberDialog.vue 相关逻辑

## 验证与归属
- 验证：extracted source=cursor session=5da2257a-c9d5-4f09-90a9-7427329ccddc
- 涉及文件：candidateCollect/components/CandidateDialog.vue、enums.js、CandidateTable.vue、preparatoryGroup/components/MemberDialog.vue
- 所属项目：泰兴G/zhi2-web-admin；代码基线：none；来源会话：5da2257a-c9d5-4f09-90a9-7427329ccddc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_type_hidden",
  "source_extraction_id": "b6ef5637059a4f3f841af431095bf281",
  "version": 1,
  "memory_type": "entities"
}
-->