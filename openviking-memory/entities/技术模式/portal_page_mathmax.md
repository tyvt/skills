# Portal Page Math Max
页码生成误用了 Math.max，产生了多余的页面。

## 描述
- `displayedPages` 被写为 `Math.max(2, this.pages)`，导致在总数为 1 时 v-for 中生成了两页。
- 修正为 `return this.pages`，在单页情况下仅显示第 1 页。
- 影响 `PortalTable` 的分页。

## 文件
- `PortalTable.vue`

## 验证
- 源会话: `176808fe-ac0e-40e4-872f-fa68fc7638ab`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_page_mathmax",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->