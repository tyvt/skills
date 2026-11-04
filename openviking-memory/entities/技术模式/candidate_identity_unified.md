# CandidateDialog 统一身份逻辑
在 zhi2-web-admin（产品 2.0）中，CandidateDialog.vue 和 CandidateTable.vue 已将委员会和筹备组的身份逻辑统一。

## 问题
- v-if 在委员会中隐藏了“身份”，阻止了“候选人类型”下拉框（字典 owner_candidate_apply_identity_flag）
- isOwnerIdentity 未统一；initDict 和 getForm 强制覆盖所有者逻辑

## 解决方案
- 移除隐藏“身份”的 v-if 以显示“候选人类型”下拉框
- 将 isOwnerIdentity 统一为 identityFlag === '0'
- initDict 和 getForm 移除强制覆盖所有者的逻辑
- CandidateTable.vue 为委员会和筹备组显示 identityFlag 列；若不是所有者则地址为空

## 验证与归属
- 涉及文件: autonomy/candidateCollect/components/CandidateDialog.vue 和 CandidateTable.vue
- 验证证据: src=产品2.0/073.md; 会话 a7a5e039-a9de-4b35-abd5-2be482e8d502; 代码库 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_identity_unified",
  "source_extraction_id": "0edb7cc648894aa9871156f6c2fe3d68",
  "version": 1,
  "memory_type": "entities"
}
-->