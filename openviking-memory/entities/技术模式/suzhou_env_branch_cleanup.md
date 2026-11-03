# Ramos de ambiente Suzhou remanescentes causam lógica não unificada
No projeto 苏州市房地产监测V3, arquivos como `exchangeContract/index.vue` mantêm ramos `isSuzhouzhizai` e `currentEnvironment`, acoplando a lógica.

## Causa raiz
- `exchangeContract/index.vue` e outros mantêm ramos `isSuzhouzhizai` e `currentEnvironment`
- Os ramos de ambiente acoplam a lógica e impedem unificação entre arquivos

## Solução
- Remover os ramos e unificar a estrutura genérica
- Fixar colunas exibidas e a API `/building/buildinginfo/xyBuilding` de `BuildSelectDialog.vue`
- Em `rec/index.vue`, unificar a interface `listRec` e os textos

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/277.md
- Arquivos: exchangeContract/index.vue, contractView/index.vue, BranchOneDialog.vue, BuildSelectDialog.vue (duas pastas benefit), rec/index.vue
- Projeto: 苏州市房地产监测V3; Sessão: bf97360e-6cc0-4224-aef3-edf155a68b8e; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_env_branch_cleanup",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 1,
  "memory_type": "entities"
}
-->