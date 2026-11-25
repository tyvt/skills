---
audit_status: invalid
last_checked: 2026-11-25T22:35:06+08:00
verdict_note: 记忆仅记字号规格差异，无涉及文件/行号，验证方式为临时注入且已清除，无可核对的代码证据，无法证明有效。
---
# V3 源码字号规格
V3 源码在品牌标题、菜单标签与图标尺寸上与当前候选存在差异。

## 源码规格
- 品牌标题：21/600。
- 菜单标签：16/400。
- 图标：26px。

## 当前候选
- 品牌标题：24/700。
- 菜单标签：14px。
- 图标：28px。

## 验证
- 用一次性临时 E2E 样式注入验证 V3 字号对参考图的影响，随后清除注入代码。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_font_spec",
  "source_extraction_id": "8d605fcee12c4e759a70306062f52778",
  "version": 1,
  "memory_type": "entities"
}
-->