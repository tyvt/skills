# ZsPopup 透明蓝角
移除伪元素并使背景透明以消除顶部蓝角。
## 问题根因
- `.popup-container::after` 创建蓝角; `uni-popup` 具有默认蓝色背景。
## 解决方案
- 移除 `ZsPopup.vue` 中的 `.popup-container::after`。
- 添加 `overflow: hidden` 以裁剪圆角溢出。
- 将 `uni-popup` 改为 `background-color="transparent"`。
- 添加 `:deep(.uni-popup__wrapper) { background: transparent !important; }`。
## 文件
- `ZsPopup.vue`, `addHouse.vue`, `ZsButton.vue`, `zs-button.scss`, `ZsPicker.vue`, `authorization.vue`, `package.json`, `2026-09-11.md`.
## 验证
- cursor 会话 9b073154-cc39-42ea-a983-a2a4c7876b10; base: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_popup_transparent",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->