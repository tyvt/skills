# Falha de referência de imagem marker entre pacotes e colapso de textarea
No projeto móvel Su Housing C, location-red.png referenciado via @/static entre pacotes causava erro 500 do mini-programa e flex horizontal em form2.scss causava colapso de altura em ZsTextarea.

## Causa raiz
- Imagem location-red.png referenciada com @/static entre pacotes causava erro de parsing 500 no mini-programa
- Flex horizontal em form2.scss fez ZsTextarea colapsar altura em addAlone.vue

## Correção
- Usar resolveStaticUrl especificando o pacote pages_main para a imagem
- Ajustar estilo .description em addAlone.vue para corrigir colapso de ZsTextarea

## Arquivos envolvidos
- src/pages_owner_extra/elevator/addAlone.vue
- src/components/ZsTextarea/ZsTextarea.vue
- src/styles/form2.scss
- src/utils/index.js
- src/pages_owner_extra/elevator/add.vue
- src/pages_feedback/feedback/add_feedback.vue
- src/pages.json
- src/pages_owner_extra/elevator/input.vue

## Verificação
- Evidência: extracted source=cursor session=85a3ba6b-0da3-48e5-b7f4-7ebc9f354ad6
- Projeto: Su Housing C (zhi2-mobile-shimin); base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito do projeto Su Housing C",
  "name": "marker_pkg_textarea",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->