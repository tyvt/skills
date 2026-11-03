# Campo de endereço em duas colunas evita desalinhamento de grade
No estado de edição, o campo "项目坐落" ocupava 16 colunas dentro de `el-row`, deixando 8 para o resto e empurrando "统一社会信用代码" para uma terceira coluna desalinhada.

## Solução
- Mudar o estado de edição para grade de três colunas com `section-form`
- Campos comuns usam `section-field`
- "项目坐落" usa `section-field--wide` ocupando duas colunas
- "预售描述" usa `section-field--full` ocupando a linha inteira

## Arquivos envolvidos
- detail.vue, PermitInfoPanel.vue, permitConstants.js
- detail-template.vue, permitExtendConstants.js, permitSelectConstants.js, surveyChangeConstants.js

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-rest/140.md
- Sessão de origem: f7e32c84-3538-433f-bf02-d17f353e9e06; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "edit_section_wide",
  "source_extraction_id": "11e2b1a202ee409c843bf7caaf319a48",
  "version": 1,
  "memory_type": "entities"
}
-->