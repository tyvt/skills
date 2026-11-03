
# Botão de alteração não oculto por tipo de agência
No projeto 苏州市房地产监测V3, a barra de ferramentas da página de informações básicas de agência de locação não ocultava o botão de alteração conforme o tipo de instituição.

## Causa raiz
- O botão de alteração original não diferenciava o tipo de instituição
- `AgencyBasicInfoDetail.vue` não tratava o caso de agência de locação (`isLeaseOrgan`)

## Solução
- No método `resolvedShowChangeBtn` de `AgencyBasicInfoDetail.vue`, retornar `false` quando `isLeaseOrgan` for verdadeiro
- Agências corretores mantêm exibição pelas regras originais como `bizState === '2'`

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/246.md
- Arquivos: company/companyManagement/components/AgencyBasicInfoDetail.vue, 路由信息.json, toB/agencyRecord/detail.vue, company/companyRecordAgency/index.vue, institution/company/index.vue, company/companyManagement/components/detail.vue, DeveloperBasicInfoDetail.vue
- Projeto: 苏州市房地产监测V3; Sessão: e9a70a5b-c33c-473a-a16b-d697f4cce441; Base de código: none


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "lease_change_btn_hidden",
  "source_extraction_id": "3440ed0abfed42a4aa0c1bc2d6540321",
  "version": 1,
  "memory_type": "entities"
}
-->