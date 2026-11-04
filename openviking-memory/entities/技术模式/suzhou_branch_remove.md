
# Padrão de remoção de ramos regionais isSuzhouzhizai
Vários arquivos continham ramos isSuzhouzhizai/currentEnvironment não unificados, que foram removidos para consolidar lógica genérica comum.

## 问题根因
- exchangeContract/index.vue e outros 5 arquivos mantinham ramos isSuzhouzhizai e currentEnvironment causando acoplamento
- notice/detail.vue, usemoney/detail.vue e mais 8 arquivos (total 10) também mantinham esses ramos
- A diversidade dificultava manutenção e padronização

## 解决方案 aplicada
- Removeu-se julgamentos e colunas específicos de região, fixando estrutura genérica (ex.: xyBuilding, interface listRec, texto "监管项目")
- Mantém-se julgamento genérico isSupervisionBank
- Campo de banco de conta unificado como ${frontLabel}/${frontBank}
- Abas de usemoney fixadas como 用款明细/关联楼幢/股东信息; RelatedBuildingsTable exibe coluna de plano de uso quando useMoneyApplyType=='emphasis'

## Arquivos afetados
- Conjunto 1: exchangeContract/index.vue, contractView/index.vue, BranchOneDialog.vue, BuildSelectDialog.vue (benefit duas vezes), rec/index.vue
- Conjunto 2: notice/detail.vue, usemoney/detail.vue, AppropriationBuildingsTable.vue, usemoneyRevoke/detail.vue, guarantee/components/RelatedBuildingsTable.vue, bond/components/BuildingTable.vue, plan/components/AppropriateTable.vue

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/077.md e src=苏州市房地产监测V3-rest/127.md
- 所属项目: 苏州市房地产监测V3; sessões: bf97360e-6cc0-4224-aef3-edf155a68b8e, f81fe328-0c4a-411a-b2a9-b762808390a4
- Linha de base: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_branch_remove",
  "source_extraction_id": "b54e474b6aa74ee0b9f522a7fb39bc63",
  "version": 2,
  "memory_type": "entities"
}
-->