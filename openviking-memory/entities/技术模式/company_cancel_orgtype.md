# Erro de parâmetro organType na lista de cancelamento
A view companyCancel/index.vue usou organType para o filtro de tipo de instituição, mas organType é parâmetro de contexto fixo (agency/lease); o filtro do usuário deve passar companyType.

## 问题根因
- Uso incorreto de `organType` como tipo de instituição na busca e formulário
- `organType` é parâmetro de contexto fixo (`agency`/`lease`), não o filtro de usuário

## Correção
- Parâmetros de consulta e campos de formulário alterados para `companyType`
- Requisição de lista usa `organType` fixo de `this.resolvedOrganType` (CompanyOrganProvider ou meta de rota), consistente com `companyRecordAgency/index.vue`

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3/258.md
- 涉及文件: zhi2-web-admin/src/views/company/companyCancel/index.vue, src/api/company/companyCancel.js, zhi2-web-admin/src/views/zljg/companyCancel/index.vue, src/mixins/companyOrganContext.js, companyRecordAgency/index.vue, companyCancel/detail.vue, e2e/list/list-card-spacing.spec.js, src/constants/companyOrgan.js
- 所属项目: 苏州市房地产监测V3; sessão: 50257d35-25d2-4753-bbb1-55a3c981474e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_orgtype",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->