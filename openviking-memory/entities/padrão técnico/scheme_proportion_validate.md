# Validação de taxa proporcional omite 0-100 e duas casas decimais
O esquema de serviço não validava a taxa de cobrança de forma diferenciada por tipo; no modo proporcional não limitava 0-100 nem duas casas decimais.

## Solução
- Adicionar verificação `isChargeTypeProportion` em `companyScheme/detail.vue`
- Alterar `rules` para `computed` implementando validação proporcional
- Observar `form.chargeType` para revalidar

## Arquivos envolvidos
- company/companyScheme/detail.vue, api/company/companyScheme.js
- institution/agencyPersonnel/components/AgencyPersonnelDetail.vue

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-rest/141.md
- Sessão de origem: 6b993f54-a54c-46d4-bd1e-32b8da6cc3ba; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "scheme_proportion_validate",
  "source_extraction_id": "11e2b1a202ee409c843bf7caaf319a48",
  "version": 1,
  "memory_type": "entities"
}
-->