# 产品2.0抽屉显隐修复：Teleport到body+根节点隐藏
产品2.0前端中，OperationBtnGroup的附件抽屉按钮不显示，已通过Teleport和根节点隐藏修复。

## 修复要点
- 在 `OperationBtnGroup/index.vue` 用 `<Teleport to="body">` 包裹 `attachmentDraw`，使抽屉渲染到 body，脱离主内容区 DOM。
- 保留 `v-if="showAnnexDialog"`，仅点击附件/制单信息/流程查看时挂载。
- 在 `attachmentDraw.vue` 增加根节点 `div.attachment-drawer-root`，加 `v-show="modelValue"`。
- 根节点样式：`position: fixed; left:0; top:0; width:0; height:0; overflow:hidden; visibility:hidden; pointer-events:none;`，未打开时裁掉内部内容且不可见。

## 涉及文件
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- zhi2-web-admin/src/components/OperationBtnGroup/attachmentDraw.vue
- zhi2-web-admin/src/views/property/complexChange/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0；来源会话ID：606fcea2-85a1-4821-b6e0-0d6ddd8fddeb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "teleport_body_hidden_root",
  "source_extraction_id": "bd566589708446009d22ce7852b518b2",
  "version": 1,
  "memory_type": "entities"
}
-->