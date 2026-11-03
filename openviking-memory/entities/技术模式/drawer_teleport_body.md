# Drawer 默认插槽须 Teleport 至 body
`attachmentDraw` 默认 slot 若留于主内容区 DOM，会导致抽屉内容直接显示，需 Teleport 至 body 解决。

## 问题根因
- `attachmentDraw` 默认 slot 留于主内容区 DOM，导致内容直接显示，未随抽屉收起。
- 父组件未做 DOM 隔离，抽屉关闭态内容仍可见。

## 解决方案
- `OperationBtnGroup/index.vue` 以 `<Teleport to="body">` 包裹 `attachmentDraw`。
- `attachmentDraw.vue` 增设 `div.attachment-drawer-root`，配合 `v-show` 与 `position:fixed; width:0; visibility:hidden` 样式裁掉外漏。

## 验证与归属
- 验证证据：src=2-0/010.md
- 涉及文件：OperationBtnGroup/index.vue、attachmentDraw.vue
- 所属项目：2-0；来源会话ID：606fcea2-85a1-4821-b6e0-0d6ddd8fddeb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "drawer_teleport_body",
  "source_extraction_id": "d605c9e3116c40ecab3d74860b526a1f",
  "version": 1,
  "memory_type": "entities"
}
-->