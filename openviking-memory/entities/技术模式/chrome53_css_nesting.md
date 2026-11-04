# Chrome53 Não Suporta Aninhamento CSS
Alvo de build chrome53 quebra compressão esbuild por sintaxe de aninhamento.
## 问题根因
- Build target chrome53 não suporta CSS nesting (`&~.xxx`, aninhamento pai).
- esbuild falha na compressão.
## 解决方案
- Achatar seletores em 4 arquivos (ex: `&~.info-row` → `.info-row ~ .info-row`).
- Usar `.count-block .total-count` em vez de aninhamento.
## Arquivos
- `company-detail.vue`, `property-detail.vue`, `PropertyCard.vue`, `data-analysis.vue`.
## Verificação
- Sessão cursor ce271386-7c66-451e-b5aa-3595f5dce594; base: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "chrome53_css_nesting",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->