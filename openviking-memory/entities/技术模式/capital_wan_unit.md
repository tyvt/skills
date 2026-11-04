# Registro de Capital Unificado com Componente de Valor em Unidade Wan

No projeto 苏州市房地产监测V3, o padrão de exibição do registro de capital foi unificado para usar o componente de valor com unidade em wan (万元).

## 描述
- O registro de capital era originalmente concatenado manualmente via `formatFixedDecimal` no `displayValue` de `AgencyBranchDetail.vue`, sem usar a configuração de unidade de valor.
- `agencyBasicInfoContent.js` configura `type: 'amount'`, `unit: '万元'`, `dot: 2` para a visualização de consulta.
- O `basicInfoView` de `AgencyBranchDetail.vue` passa a usar a exibição de valor do `DetailTemplate`, removendo a referência a `formatFixedDecimal`.
- `institutionRegister/detail.vue` e outras páginas foram sincronizadas com o mesmo padrão.

## Arquivos Envolvidos
- `src/views/company/institutionRegister/detail.vue`
- `src/views/institution/agencyBranch/components/AgencyBranchDetail.vue`
- `src/components/detail-template/detail-template.vue`
- `src/views/company/companyManagement/components/subCompanyRecordTable.vue`, `detail.vue`, `developerBasicInfoContent.js`, `agencyBasicInfoContent.js`
- `src/views/company/companyApplyAudit/detail.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/186.md
- Sessão de origem: 933f8c6e-62d9-4070-9cc4-09de061894a6
- 所属项目: 苏州市房地产监测V3; baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "capital_wan_unit",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 2,
  "memory_type": "entities"
}
-->