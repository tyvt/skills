# Componente de Paginação Não Registrado Causa Aviso Vue
Uso de tag `<pagination>` não registrada em pop-ups disparou `[Vue warn]: Unknown custom element` no projeto Suzhou Real Estate Monitoring V3.

## Descrição
- Projeto: Suzhou Real Estate Monitoring V3 (zhi2-web-admin)
- 5 arquivos incluindo contractDialog.vue substituíram `<pagination>` por `<zs-pagination>` global
- Props de paginação e evento `@pagination` mantidos inalterados

## Causa Raiz
- `<pagination>` não estava registrada globalmente, causando aviso Vue em diálogos

## Correção
- Substituiu-se `<pagination>` por `<zs-pagination>` em contractDialog.vue e outros 4 arquivos
- Mantiveram-se mesmos props e binding de evento

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/084.md
- Sessão: cf3b0379-9286-40e8-bc28-5a333098c2a0
- Arquivos: contractDialog.vue, projectDialog.vue, BuildingDialog.vue, presale/template/index.vue, contractMainInfo/index.vue, contractNoDialog.vue, zs-pagination.vue, package.json

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "unregistered_pagination_component",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 2,
  "memory_type": "entities"
}
-->