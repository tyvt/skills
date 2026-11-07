# 业委会筹备组候选人字典
产品2.0后台业委会与筹备组候选人身份标识使用两套独立字典，非业主可跳过不动产校验，避免流程卡死。

## 业务背景
- 业委会与筹备组是两条并行业务线，字典编码各配一套，不能互相复用
- 业委会新增候选人类型必须用 owner_candidate_apply_identity_flag（0=业主，1=非业主），筹备组仍用 candidate_apply_identity_flag
- V2不少项目未对接不动产接口，原恒按业主处理导致无法校验权利人、流程走不下去

## 实现要点
- CandidateDialog 里业委会也展示「候选人类型」，按业务线传不同字典编码
- 选业主(0)显示户室/幢号/单元并带出不可编辑住址；选非业主隐藏并清空户室关联字段、住址可手填
- 提交前用 normalizeFormForIdentity 清除非业主户室字段，后端按 identityFlag=非业主跳过权利人/业主身份校验
- 列表新增候选人类型列，非业主行住址列显示为空

## 验证与归属
- 验证证据：会话 eb8bc9bb（2026-07-27，基线1d563df）改造 CandidateDialog.vue / CandidateTable.vue，明确两套字典使用
- 涉及文件：zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue、CandidateTable.vue、enums.js
- 所属项目：产品2.0；来源会话：eb8bc9bb-60c6-44ff-8cdd-d45d8bc2c03d；代码基线：无

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_identity_flag",
  "source_extraction_id": "972b21df6a454c439c8db1320a0d9503",
  "version": 1,
  "memory_type": "entities"
}
-->