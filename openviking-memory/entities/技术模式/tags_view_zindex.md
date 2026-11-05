
# 标签栏左侧边框浮于弹窗遮罩修复
淮安物管 zhi2-web-admin 中 TagsView 标签栏「更多」区域 z-index 过高，导致打开弹窗遮罩时左侧 border 浮于遮罩上的修复约定。

## 问题背景
- `.more-btn-wrapper` 与 `.dropdown-menu` 使用 `z-index: 3000`，高于 Element UI 弹窗遮罩（常见 2000 段）。
- 整块「更多」区域（含左侧 `border-left`）压在半透明遮罩上，竖线扎眼。

## 修复方案
- `.tags-view-container`：增加 `position: relative` 与 `z-index: 8`，使标签栏处于低于弹窗层的堆叠上下文，仍能盖住下方主内容区伸出的下拉菜单。
- `.more-btn-wrapper`：`3000` 改为 `21`，仅保证在标签栏内部高于左右滚动按钮（10～20）。
- `.dropdown-menu`：`3000` 改为 `22`，只在「更多」容器内盖在按钮之上，不再参与全局 3000 层。
- 若需微调标签栏层级，在 8～1999 间调整 `.tags-view-container` 的 `z-index`。

## 涉及文件
- zhi2-web-admin/src/layout/components/TagsView/index.vue
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/layout/components/AppMain.vue

## 验证与归属
- 验证证据：src=淮安物管 cursor 提取
- 所属项目：淮安物管；来源会话：a7d237af-56e5-49f4-a9d3-51c02c04b0cb；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tags_view_zindex",
  "source_extraction_id": "829524b31da8427facda7c3ea75fe26b",
  "version": 1,
  "memory_type": "entities"
}
-->