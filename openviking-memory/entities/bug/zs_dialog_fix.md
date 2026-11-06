# zs-dialog弹窗不居中修复
苏州市房地产监测V3 中「菜单详情」等 `zs-dialog` 弹窗不居中的问题已修复，所有使用该组件的弹窗均受益。

## 问题原因
- 水平：`v-dialogDrag` 用 `left: 50%` + `translateX(-50%)` 居中，但 `zs-dialog` 打开动画把 `transform` 写成 `scale3d(1,1,1)` 盖掉 `translateX`，弹窗偏到一侧
- 垂直：拖拽指令固定 `top: 15vh`，不是视口垂直居中

## 修复方式
- `drag.js`：打开时不再写 `absolute`/`15vh`/`translateX`，由 wrapper 的 flex 居中；仅按住标题栏拖动时改为绝对定位
- `zs-dialog.vue`：为普通表单弹窗增加 flex 水平+垂直居中
- 关闭时清除拖拽留下的内联 `position/left/top/transform`，下次打开仍居中

## 验证与归属
- 验证：刷新页面后在 系统管理→菜单管理 打开「菜单详情」确认居中
- 涉及文件：`drag.js`、`zs-dialog.vue`、`system/menu/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话：13d9e93b-10ce-47af-a240-665dac7d8d84

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "zs_dialog_fix",
  "source_extraction_id": "eb7c3c1e01c14b17a2de9c1e4de0e0e9",
  "version": 1,
  "memory_type": "entities"
}
-->