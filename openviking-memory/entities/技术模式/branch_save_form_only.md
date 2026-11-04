# Salvamento de filial valida apenas formulário sem pré-verificação de apêndice
No 苏州市房地产监测V3, o salvamento da filial de agência passou a validar apenas o formulário, removendo lógica de submissão, aprovação e pré-verificação de apêndice.

## Contexto e objetivo
- Após o registro da agência principal, o backend registra automaticamente; o frontend não precisa mais tratar submissão e aprovação
- Simplificar o fluxo de salvamento da filial; upload de apêndice deixa de ser bloqueio prévio do salvamento

## Alterações
- `AgencyBranchDetail.vue` chama apenas `handleSave` para validação de formulário
- Desativa `show-submit` e `show-approval` (entradas de submissão e aprovação)
- `agencyBranch.js` remove `listAgencyBranchAppendix` e `validateAppendix` (pré-verificação)
- Ajustes sincronizados em complex/detail.vue, detailMixins.js, form.js etc.

## Impacto em testes
- E2E remove cenário de bloqueio por apêndice faltante
- Salvamento não expira mais por falta de apêndice

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-rest/072.md
- 涉及文件: AgencyBranchDetail.vue, complex/detail.vue, detailMixins.js, form.js, formComponents.js, vite.config.js, OperationBtnGroup/index.vue, AgencyBranchList.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 40edb9e5-354a-4c2b-8557-eea7a3245770; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_save_form_only",
  "source_extraction_id": "f3025b0b72ad4d9da2b7a5d18356898a",
  "version": 1,
  "memory_type": "entities"
}
-->