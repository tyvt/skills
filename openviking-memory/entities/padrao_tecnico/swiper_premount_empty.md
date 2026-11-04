# Swiper pré-montado com array vazio causa erro fileSite
A página `pages_transaction/stockHouse/detail` monta `swiper-component` antes dos dados e sem `v-if`, gerando erro ao acessar `allList[currentSlide].fileSite` com array vazio.

## Causa raiz
- Montagem de `swiper-component` antes do carregamento de dados, sem guarda `v-if`
- Acesso a `allList[currentSlide].fileSite` falha quando o array está vazio
- `currentSlide` com valor hardcoded apresenta risco de estouro de índice

## Correção
- Adicionar guarda `v-if` na camada de vídeo de `swiperComponent.vue`
- Eliminar o risco de estouro por índice hardcoded em `currentSlide`

## Arquivos e verificação
- `src/pages_transaction/stockHouse/detail.vue`
- `src/pages/commonNew/swiperComponent.vue`, `src/components/commonNew/swiperComponent.vue`
- Projeto: 苏住房C (zhi2-mobile-shimin); sessão: db381270-844e-45c8-899a-a19894dde18f

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "swiper_premount_empty",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->