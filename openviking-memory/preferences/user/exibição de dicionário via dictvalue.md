- Exibir dicionários usando prioritariamente dictValue/dictLabel em vez de value/label para evitar exibição de códigos
- Causa raiz: formatSelectOptionsDisplay e o tag de detail-template buscavam por value/label, mas getDicts usa dictValue/dictLabel, causando fallback para código
- Pontos de correção: formatSelectOptionsDisplay e getItemValueDisplayString em detail-template.vue devem priorizar dictValue/dictLabel
- Arquivos: detail-template.vue, property/complexChange/detail.vue, main.js, mixins/area.js, dict-tag.vue, mixins/detailMixins.js, utils/dict.js
- Evidência: src=产品2.0/028.md; Sessão: b608284d-b42b-4810-99bd-afe869af0cbd

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Exibição de dicionário via dictValue",
  "source_extraction_id": "9ff25583c9e74f7aa13437ad3483f5e0",
  "version": 1,
  "memory_type": "preferences"
}
-->