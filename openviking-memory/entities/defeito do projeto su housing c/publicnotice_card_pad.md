# Cartão de categoria com padding superior impede centralização de título
No projeto Su Housing C, cartão de categoria 'dupla exposição' só com padding superior deixava título não centralizado.

## Causa raiz
- Cartão definia apenas padding superior e empilhava título e seta verticalmente
- Título não conseguia centralizar relativo à altura do cartão

## Correção
- Em pages_main/publicNotice/index.vue usar flex com padding simétrico 32rpx top/bottom
- Lado esquerdo fixo 128rpx altura, título align-items:center, seta posicionada absolute canto inferior esquerdo

## Arquivos envolvidos
- src/pages_main/publicNotice/index.vue
- src/pages_main/publicNotice/publicNotice.vue
- src/pages_main/publicNotice/components/ListIndex.vue
- src/pages/publicNotice/index.vue
- src/pages/publicNotice/publicNotice.vue
- src/pages/publicNotice/components/ListIndex.vue
- src/pages.json

## Verificação
- Evidência: extracted source=cursor session=0ec624e9-b4c9-406a-8cb8-9a62616cca2e
- Projeto: Su Housing C (zhi2-mobile-shimin); base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito do projeto Su Housing C",
  "name": "publicnotice_card_pad",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->