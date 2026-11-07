# 泰兴G业主候选人征集隐藏候选人类型
在泰兴G项目业委会候选人征集（businessType='0'）场景下，报名弹窗与列表隐藏「候选人类型」字段，并默认按「业主」处理。

## 弹窗逻辑
- `CandidateDialog.vue` 业委会候选人征集时隐藏「候选人类型」表单项，查看详情同样不显示
- 打开弹窗自动将 `identityFlag` 设为 `'0'`（业主），提交时强制带上 `identityFlag='0'`

## 表格逻辑
- `CandidateTable.vue` 业委会候选人征集时列表不显示「候选人类型」列
- 筹备组征集仍保留「身份标识」列，逻辑不变

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴G
- 涉及文件：`CandidateDialog.vue`、`CandidateTable.vue`、enums.js 等（路径 d:/repository/泰兴G/zhi2-web-admin/src/views/autonomy/candidateCollect）
- 所属项目：泰兴G；来源会话：5da2257a-c9d5-4f09-90a9-7427329ccddc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_type_hidden",
  "source_extraction_id": "47b34f339d8f45c8bb02598401ebc0b1",
  "version": 1,
  "memory_type": "entities"
}
-->