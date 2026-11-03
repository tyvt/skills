# ElDialog 挂运行时指令致 Teleport 失效告警
产品2.0 中 Vue3 在 ElDialog 等根非单元素组件上用自定义运行时指令会报 Teleport 失效告警。

## 问题根因
- Vue3 在根非单元素组件（Element Plus ElDialog 内部 Teleport）上使用自定义运行时指令（如 v-dialogDrag）
- 报错 `Runtime directive used on component with non-element root node`

## 解决方案
- ZsDialog 改用 Element Plus 原生 `draggable`（element-plus@2.8.0+）
- 勿把指令写在 `<el-dialog>` 标签上
- 同类组件要么用内置属性，要么把指令绑到组件内部真实 DOM

## 验证与归属
- 验证证据：会话 c1098e7c，zs-dialog.vue 去掉 v-dialogDrag，改为 :draggable
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- 所属项目：2-0；来源会话ID：c1098e7c-136f-424c-bd78-3be376262378；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsdialog_draggable_directive",
  "source_extraction_id": "3f3584722eb94e54a6ca13a715f1e5bf",
  "version": 1,
  "memory_type": "entities"
}
-->