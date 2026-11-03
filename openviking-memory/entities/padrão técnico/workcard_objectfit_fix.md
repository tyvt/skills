# Download de crachá com object-fit faltante
html2canvas não suporta nativamente object-fit, causando esticamento de imagem em download de crachá.

## Problema
- `html2canvas` não suporta `object-fit`, deformando foto de crachá e logo no download.

## Solução
- Novo `html2canvasObjectFit.js` redesenha imagens conforme object-fit no canvas durante `onclone`.
- `WorkCardDialog.vue` e `InfoCardDialog.vue` em `handleDownload` processam nós `.work-card__photo`, `.work-card__logo`.

## Arquivos
- WorkCardDialog.vue, AgencyPersonnelList.vue, InfoCardDialog.vue, spec e2e, resolveServerAssetUrl.js, html2canvasObjectFit.js, package.json.

## Verificação
- Evidência: src=苏州市房地产监测V3-leftover/020.md; sessão 0b2661f5-bbe8-434f-86da-96244d6397a7; projeto 苏州市房地产监测V3.

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "workcard_objectfit_fix",
  "source_extraction_id": "5cb4457da8b74ad0b105228a1b4260cf",
  "version": 1,
  "memory_type": "entities"
}
-->