# ZsImage com altura total causa ícone com altura zero sem pai definido
No projeto 苏住房C (zhi2-mobile-shimin), `ZsImage` renderizava ícone com altura 0 quando o pai não tinha altura explícita.

## Causa Raiz
- `ZsImage` usa `width: 100%` e `height: 100%` por padrão
- Em `.footer-btn-left` sem altura explícita, o ícone renderizava com altura 0

## Correção
- Em `conditionScreening.vue`, definir ícone fixo `16×16px` e `margin-bottom: 4px`

## Verificação e Origem
- Projeto: 苏住房C (zhi2-mobile-shimin)
- Sessão de origem: dcb389f5-4d39-4923-958e-bf04219059c1
- Arquivos: src/components/commonNew/conditionScreening.vue, src/components/ZsImage/ZsImage.vue, src/utils/index.js, src/pages_transaction/newHouse/index.vue, src/pages_transaction/stockHouse/components/moreForm.vue, src/utils/mainStaticPaths.js, src/components/commonNew/gridNav.vue
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "zsimage_icon_height",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->