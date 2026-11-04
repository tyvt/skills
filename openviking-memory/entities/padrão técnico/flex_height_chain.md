# Cadeia flex ausente causa altura inconsistente entre painéis
Em modo de visualização, falta de cadeia completa de estilos flex faz card de visão geral de área não acompanhar a altura da tabela à esquerda.

## Causa raiz
- complexChange/detail.vue (modo visualização) não possui cadeia completa de estilos flex.
- Card de visão geral de área à direita não se estica junto com a tabela à esquerda.

## Solução
- Adicionar classes como basic-info-overview.
- Container pai com align-items: stretch.
- detail-content à esquerda e area-overview-wrapper à direita com flex: 1 progressivo para preencher.

## Verificação e proveniência
- Arquivos: src/views/property/complexChange/detail.vue; src/views/property/complex/detail.vue; src/components/Headline/index.vue; src/components/detail-template/detail-template.vue.
- Sessão: 1e61e3a9-dc70-4426-b664-29e85e61ae8d; código base: none.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "flex_height_chain",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 1,
  "memory_type": "entities"
}
-->