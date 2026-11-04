# 项目 ZsImage 图标约定
图标必须使用 `ZsImage`，否则构建失败。
## 问题根因
- `authentication.vue` 使用了 `../../../static/images/szf/icon-checked.svg`（不存在）且未使用 `ZsImage`。
- 违反了项目约定。
## 解决方案
- 替换为组件 `ZsImage`，路径使用 `/images/szf/...`。
- 在 `publishHouse/index.vue` 中将 `warn.png` 从 `../static` 修正为 `../../static`。
## 文件
- `authentication.vue`, `addTypeChoose.vue`, `vite.config.ts`, `ZsImage.vue`, `pages.json`, `TitleCard.vue`, `publishHouse/index.vue`.
## 验证
- Cursor 会话 4f2dff10-9967-4330-9845-304bfa354448; base: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_icon_convention",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->