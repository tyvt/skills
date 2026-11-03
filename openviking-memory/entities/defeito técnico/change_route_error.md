# Falha de Navegação do Botão de Alteração por Erro de Rota e Formato de ID
O botão de alteração falhava por erro de rota e formato inconsistente de ID no projeto zhi2-web-admin do monitoramento imobiliário de Suzhou V3.

## Solução
- companyRecord.js adiciona resolveChangeId() para compatibilizar ID escalar ou objeto retornado por getLastByLogin
- CompanyBasicInfoDetail.vue usa findRouterByFilePath para busca silenciosa de rota (prioriza toB/change/detail com fallback)
- loadActiveChange, detailCallback e navigateToChangeEdit normalizam o ID; navegação usa path + changeId com query { formMode: 'edit', id }

## Verificação
- Evidência: src=苏州市房地产监测V3/061.md
- Arquivos: CompanyBasicInfoDetail.vue; companyRecord.js; ruoyi.js; detail.vue; index.vue; detailMixins.js; form.js; main.js
- Sessão: ac2a541a-e0f6-41f2-bba0-8b283388ff32; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "change_route_error",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 1,
  "memory_type": "entities"
}
-->