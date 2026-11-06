# 弹窗懒挂载与 @open 不匹配导致列表未加载
苏州市房地产监测V3 中父页面用 `v-if` + `:visible.sync` 懒创建弹窗，导致 `@open` 生命周期不匹配、`getList()` 首次打开未调用。

## 问题根因
- 父页面（缴款通知书、其他缴款等详情页）普遍用 `v-if` + `:visible.sync` 懒创建弹窗，点击时 `isProjectDialogVisible=true` 使组件首次挂载时 `visible` 已是 `true`
- 弹窗组件（ProjectDialog，views/components 与 components/ProjectDialog 两套实现一致）只在 `@open` 里调列表接口
- `@open` 仅在 `visible` 由 false→true 时触发，挂载即 `true` 故 `@open` 从未触发，`getList()` 从未被调用

## 涉及文件
- `zhi2-web-admin/src/views/supervision/deposit/other_record/detail.vue`
- `zhi2-web-admin/src/views/components/ProjectDialog.vue`
- `zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue`

## 归属
- 所属项目：苏州市房地产监测V3
- 来源会话：8741662d-a0ae-43f6-861e-3a3ff5b3e5f4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_lazy_mount",
  "source_extraction_id": "006d2482687443a7a80ce2847fa57669",
  "version": 1,
  "memory_type": "entities"
}
-->