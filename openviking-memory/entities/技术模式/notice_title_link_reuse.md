# Reuso de rota de detalhe em link de título de aviso
Padrão do portal para a coluna de título de avisos públicos reusar a rota de detalhe via link realçado.

## Propósito
- Reutilizar a rota de detalhe "查看" via $emit('navigate', { kind: 'notice-detail', record: row })
- Manter estilo azul realçado, negrito e ellipsis no título

## Implementação
- InformationPages.vue usa slot #cell-title para renderizar button.portal-link.portal-notice-title
- PortalTable.vue e PortalDialogHost.vue dão suporte ao evento navigate
- mock/notices.js fornece dados de aviso para testes

## Verificação
- Teste E2E public-portal-interactions.spec.ts valida clique no título abrindo detalhe e retorno
- 验证证据: src=门户/020.md; sessão: c58d5c89-4619-4408-90ad-208094cad341

## Arquivos
- src/views/home/publicPortal/pages/InformationPages.vue
- src/views/home/publicPortal/components/PortalTable.vue
- src/views/home/publicPortal/PortalDialogHost.vue
- src/views/home/publicPortal/mock/notices.js e portal.scss
- tests/e2e/public-portal-interactions.spec.ts, fixtures/public-portal-designs.ts, _tmp-debug-title.spec.ts

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "notice_title_link_reuse",
  "source_extraction_id": "eedff5713f73492399aa37cd69b61f82",
  "version": 1,
  "memory_type": "entities"
}
-->