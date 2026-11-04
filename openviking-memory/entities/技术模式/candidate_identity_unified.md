# CandidateDialog unifica lógica de identidade
No zhi2-web-admin (produto 2.0), CandidateDialog.vue e CandidateTable.vue tiveram a lógica de identidade de comitê e grupo preparatório unificada.

## Problema
- v-if ocultava "identidade" no comitê, impedindo o dropdown "tipo de candidato" (dicionário owner_candidate_apply_identity_flag)
- isOwnerIdentity não estava unificado; initDict e getForm forçavam sobrescrever lógica de proprietário

## 解决方案
- Remover v-if que oculta "identidade" para exibir dropdown "tipo de candidato"
- Unificar isOwnerIdentity como identityFlag === '0'
- initDict e getForm removem lógica de sobrescrita forçada do proprietário
- CandidateTable.vue exibe coluna identityFlag para comitê e grupo; endereço vazio se não for proprietário

## 验证与归属
- 涉及文件: autonomy/candidateCollect/components/CandidateDialog.vue e CandidateTable.vue
- 验证证据: src=产品2.0/073.md; sessão a7a5e039-a9de-4b35-abd5-2be482e8d502; base de código none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_identity_unified",
  "source_extraction_id": "0edb7cc648894aa9871156f6c2fe3d68",
  "version": 1,
  "memory_type": "entities"
}
-->