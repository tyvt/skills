# Ícone de coleta invisível por SVG branco em fundo branco
O `newHouse/detail.vue` usa barra inferior branca com ícone `aixin_e.svg` de filtro branco (`imgType="dark"`), tornando o ícone invisível.

## 问题根因
- Barra inferior branca em `newHouse/detail.vue` usa `aixin_e.svg` com filtro branco (`imgType="dark"`)
- O ícone fica invisível sobre o fundo branco

## Correção
- Trocar para `aixin_g.png` visível sobre fundo branco
- Simplificar `imageSubpackage` em `collectBtn.vue` para retornar direto `subpackage`, evitando erro de resolução de caminho

## Arquivos e verificação
- `src/pages_transaction/newHouse/detail.vue`, `src/components/collectBtn/collectBtn.vue`
- Também afeta `stockHouse/detail.vue`, `ZsImage.vue`, `utils/index.js`, `bottomBtn.vue`, `houseCard.vue`, `NewHouse.vue`
- 所属项目: 苏住房C (zhi2-mobile-shimin); sessão: 31b6e9ca-2ea3-4981-827d-9dac98d0e40f

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "white_svg_invisible",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->