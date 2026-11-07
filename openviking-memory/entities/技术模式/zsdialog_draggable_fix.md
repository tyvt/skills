# ZSDialog 运行时指令告警修复
产品2.0 中 zhi2-web-admin 的 `ZSDialog` 组件把自定义指令 `v-dialogDrag` 挂在 `<el-dialog>` 上，因 `ElDialog` 内部 Teleport 到 body，根节点非单一 DOM 元素，触发 `[Vue warn]: Runtime directive` 告警。

## 问题根因
- 运行时指令写在根节点非单一 DOM 元素的组件上（ElDialog 使用 Teleport）。
- 触发点：ZSDialog 组件将 `v-dialogDrag` 直接挂在 `<el-dialog>`。

## 解决方案
- 不再使用 `v-dialogDrag`，改用 Element Plus 原生 `draggable` 属性（当前 element-plus@2.8.0 支持）。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 c1098e7c 报 Runtime directive 告警；修复见 zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue 1:10。
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- 所属项目：2-0；来源会话ID：c1098e7c-136f-424c-bd78-3be376262378；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsdialog_draggable_fix",
  "source_extraction_id": "464ccee4c19e426fbb67c2365f53421a",
  "version": 1,
  "memory_type": "entities"
}
-->