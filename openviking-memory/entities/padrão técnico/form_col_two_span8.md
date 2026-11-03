# FORM_COL_TWO convertido em span8 ocupa 1/3 da largura
No projeto 苏州市房地产监测V3, `FORM_COL_TWO` (span=12) dentro de `DetailTemplate` é convertido por `normalizeDetailSpan` em span=8, ocupando apenas 1/3 da largura.

## Causa raiz
- `normalizeDetailSpan` em `DetailTemplate` converte `FORM_COL_TWO` (span=12) para span=8
- Isso faz o layout ocupar apenas 1/3 da largura em vez de metade

## Solução
- Em `buildOfficeContentInfo` de `developerBasicInfoContent.js`, o layout de endereço de escritório passou a usar `FORM_COL_WIDE` (span=16) para ocupar duas colunas

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3/293.md
- Arquivos: developerBasicInfoContent.js, detailLayout.js, DeveloperBasicInfoForm.vue, detail-template.vue, agencyBasicInfoContent.js, detail-form.scss
- Projeto: 苏州市房地产监测V3; Sessão: 9ec6ae3b-87cf-4803-bc6c-838d26b02903; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "form_col_two_span8",
  "source_extraction_id": "ea52cb840c62465ab3fb0dba5f6a6e78",
  "version": 2,
  "memory_type": "entities"
}
-->