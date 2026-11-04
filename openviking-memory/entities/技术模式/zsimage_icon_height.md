# ZsImage 使用全高导致父级无显式高度时图标高度为零
在项目 苏住房C (zhi2-mobile-shimin) 中，`ZsImage` 在父级没有显式高度时渲染出高度为 0 的图标。

## 问题根因
- `ZsImage` 默认使用 `width: 100%` 和 `height: 100%`
- 在 `.footer-btn-left` 没有显式高度时，图标渲染高度为 0

## 修复
- 在 `conditionScreening.vue` 中，定义固定图标 `16×16px` 和 `margin-bottom: 4px`

## 验证与归属
- 所属项目: 苏住房C (zhi2-mobile-shimin)
- 来源会话: dcb389f5-4d39-4923-958e-bf04219059c1
- 涉及文件: src/components/commonNew/conditionScreening.vue, src/components/ZsImage/ZsImage.vue, src/utils/index.js, src/pages_transaction/newHouse/index.vue, src/pages_transaction/stockHouse/components/moreForm.vue, src/utils/mainStaticPaths.js, src/components/commonNew/gridNav.vue
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_icon_height",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->