# Exibição de undefined em campo de área por não usar tipo amount
No projeto 淮安物管 (zhi2-web-admin), propertyContract/components/detail.vue usava template string `${this.form.landArea}㎡` causando "undefined㎡" quando null.

## Problema
- landArea null vira string "undefined" concatenada com ㎡
- Falta tratamento de placeholder para nulos

## Solução
- Usar type: 'amount' passando landArea/totalFloorArea direto
- detail-template getAmountDisplay trata placeholder "-" e concatena unidade

## Verificação
- Sessão cursor 1d686e0a-d458-44a4-bb4f-d49a87fb35e2
- Arquivos: src/views/property/propertyContract/components/detail.vue, src/components/detail-template/detail-template.vue

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "amount_field_null_display",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->