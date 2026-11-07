
# 业委会候选人征集显示候选人类型字段
业委会候选人征集（businessType='0'）需展示「候选人类型」下拉，弹窗与表格均显示，不再强制 identityFlag='0'。

## 弹窗逻辑
- CandidateDialog.vue 移除业委会分支隐藏"身份标识"的 v-if，业委会征集显示"候选人类型"下拉（字典 owner_candidate_apply_identity_flag，label/placeholder 由计算属性切换）
- isOwnerIdentity 统一为 identityFlag === '0'：选"非业主"后隐藏户室号/幢号/单元名称，户室号不再必填，切换时自动清空业主房屋信息（原有 watch 生效）
- initDict：删除业委会强制 identityFlag='0'，仅新增模式下默认"业主"

## 提交与回显
- getForm：删除提交时强制覆盖为"业主"，按用户所选值提交
- 查看模式详情：候选人类型始终回显

## 表格逻辑
- CandidateTable.vue 的 identityFlag 列两种业务类型都显示：业委会显示为"候选人类型"（字典 owner_candidate_apply_identity_flag），筹备组仍为"身份标识"（原字典）
- 非业主时住址列显示为空（原有 positionFormatter）

## 验证与归属
- 验证：extracted source=workbuddy project=产品2.0
- 涉及文件：D:/repository/产品2.0/zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue、CandidateTable.vue
- 所属项目：产品2.0；来源会话：a7a5e039-a9de-4b35-abd5-2be482e8d502；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_type_shown",
  "source_extraction_id": "0357bb6974ce4249923105ec55d6971d",
  "version": 2,
  "memory_type": "entities"
}
-->