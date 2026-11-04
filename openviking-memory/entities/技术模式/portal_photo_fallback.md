# Portal Photo Fallback
Fallback para foto de pessoa ausente usando empty.svg no portal de aluguel.

## 描述
- Página de divulgação de funcionários de imobiliárias não mostrava imagem quando faltava foto.
- Adicionado `resolvePersonPhotoSrc` em `portalPersonPhoto.js` para retornar `/assets/images/empty.svg` quando não há photo/photoUrl/avatar/headPortrait ou falha de carregamento.
- Detalhe do corretor à esquerda passou a usar `img` com borda.
- Placeholder do logo da instituição não foi alterado.

## Arquivos
- `RentalDetailDialog.vue`, `BrokerPages.vue`, `PortalDialogHost.vue`, `RentalPages.vue`
- `tests/e2e/public-portal-interactions.spec.ts`, `mock/brokers.js`, `UnifiedLogin.vue`, `tests/e2e/fixtures/public-portal-designs.ts`

## Verificação
- Sessão de origem: `5942ae9c-e4bd-4732-877f-0bca30cb992b`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_photo_fallback",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->