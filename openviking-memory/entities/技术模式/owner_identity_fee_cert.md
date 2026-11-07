# 业委会征集物业费证明依业主身份必填
园区公共收益项目(zhi2-web-admin)中 CandidateDialog.vue 将 showPropertyFeeCertificate 返回条件改为 isOwnerIdentity，使业委会候选人征集显示必填物业费结清证明。

## 问题根因
- CandidateDialog.vue 中 showPropertyFeeCertificate 原返回条件未基于业主身份判断，业委会候选人征集场景需显示必填物业费结清证明

## 解决方案
- 将 showPropertyFeeCertificate 返回条件改为 this.isOwnerIdentity
- 业委会候选人征集（isOwnerIdentity 恒 true）显示必填物业费结清证明
- 筹备组征集业主身份逻辑不变，校验与回显复用原有绑定

## 涉及文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/candidateCollect/components/enums.js
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/record/components/CandidateDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/mixins/dialogMixins.js
- d:/repository/园区公共收益/zhi2-web-admin/src/mixins/form.js

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：src=园区公共收益/031.md
- 来源会话ID：c7ab07b8-9451-4983-b58f-450ef783397b；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_identity_fee_cert",
  "source_extraction_id": "54321c7594a74859a7337318f84f2255",
  "version": 1,
  "memory_type": "entities"
}
-->