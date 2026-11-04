- Em `RentalDetailDialog.vue` adiciona slot de foto 102×128, priorizando campos como `photo`; quando não há URL ou falha o carregamento, exibe `/assets/images/empty.svg` e ao trocar de pessoa reseta o estado de falha.
- Teste E2E `public-portal-interactions.spec.ts` afirma que `src` da foto contém `empty.svg`.
- Arquivos envolvidos: RentalDetailDialog.vue, BrokerPages.vue, public-portal-interactions.spec.ts, rental.js, public-portal-designs.ts, detail.vue (personnelRecord), PortalDetailHeader.vue, RentalPages.vue.
- Evidência: src=门户/017.md; sessão: 44666f5e-377b-4054-95b9-ebfb3f53c03e

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Imagem padrão em popup de detalhe de corretor",
  "source_extraction_id": "683e24bb833d49fc8c75225cd2166982",
  "version": 1,
  "memory_type": "preferences"
}
-->