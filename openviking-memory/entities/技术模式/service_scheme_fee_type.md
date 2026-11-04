# Tipo de cobrança sem opções por dicionário errado
O campo de tipo de cobrança do esquema de serviço não possui opções porque os componentes usaram a chave de dicionário `charge_type` em vez de `FEE_TYPE`.

## 问题根因
- `ServiceSchemePanel.vue` e `AgencyBranchDetail.vue` usam a chave de dicionário incorreta `charge_type`
- O sistema atual utiliza `FEE_TYPE`, causando dropdown de tipo de cobrança sem opções

## 解决方案
- Alterar a chave de dicionário para `FEE_TYPE` em `ServiceSchemePanel.vue`, `AgencyBranchDetail.vue` e no mock `agency-branch-flow.spec.js`
- Sincronizar os testes e2e correspondentes

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/118.md
- 涉及文件: `ServiceSchemePanel.vue`, `Step4ServiceScheme.vue`, `AgencyBranchDetail.vue`, `agency-branch-flow.spec.js`
- 所属项目: 苏州市房地产监测V3
- Sessão de origem: 35fd1584-6f54-4128-979b-a920dbba023c
- Baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_scheme_fee_type",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->