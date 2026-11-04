- `HomeUserCard.vue` usa `aspect-ratio:488/220` em vez de `min-height:192px` para evitar deformação; imagem de fundo via `encodeURIComponent('切图 156.svg')` para evitar não-carregamento por espaço chinês.
- Em `homeDataMixin.js` sidebar do broker fixa config `SIDEBAR_QUICK_FUNCTIONS`; remove código de depuração hardcoded `layoutVariant`.
- Arquivos: HomeUserCard.vue, HomeLayoutSidebar.vue, HomeLayoutAdmin.vue, homeLayout.js, index-new.vue, homeDataMixin.js, HomeQuickLinks.vue, portal-home-visual.spec.ts.
- Evidência: src=门户/019.md; sessão: 2a30e4bd-5103-4309-bf91-2ec90aeb4857

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Cartão de boas-vindas com proporção fixa e sidebar",
  "source_extraction_id": "683e24bb833d49fc8c75225cd2166982",
  "version": 1,
  "memory_type": "preferences"
}
-->