# 白色SVG在白色背景下导致收藏图标不可见
`newHouse/detail.vue` 使用白色底栏与白色滤镜的 `aixin_e.svg` 图标（`imgType="dark"`），导致图标不可见。

## 问题根因
- `newHouse/detail.vue` 中的白色底栏使用了带有白色滤镜的 `aixin_e.svg`（`imgType="dark"`）
- 图标在白色背景下不可见

## 修复
- 替换为在白色背景下可见的 `aixin_g.png`
- 简化 `collectBtn.vue` 中的 `imageSubpackage`，使其直接返回 `subpackage`，避免路径解析错误

## 文件与验证
- `src/pages_transaction/newHouse/detail.vue`, `src/components/collectBtn/collectBtn.vue`
- 同时影响 `stockHouse/detail.vue`, `ZsImage.vue`, `utils/index.js`, `bottomBtn.vue`, `houseCard.vue`, `NewHouse.vue`
- 所属项目: 苏住房C (zhi2-mobile-shimin); 会话: 31b6e9ca-2ea3-4981-827d-9dac98d0e40f

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "white_svg_invisible",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->