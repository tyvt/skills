# zs-dialog Vue3 v-model 绑定模式
产品2.0 中 zs-dialog 已改造为支持 `v-model` 绑定（modelValue prop），全项目统一用 v-model 打开弹窗。

## 组件改造
- zs-dialog 增加 `modelValue` prop，支持 `v-model`；新增计算属性 `dialogVisible`：`modelValue ?? this.$attrs.visible`，兼容未改完的 `v-model:visible`。
- 关闭时 emit `update:modelValue`，并兼容 Vue3（从 `$attrs` 取事件，不再用 `$listeners`）。

## 使用约定
- 父组件一律改为 `v-model="xxxVisible"`，不再使用 `v-model:visible`。
- 已对全项目批量替换 `v-model:visible=` → `v-model=`。
- 已改造组件示例：ChangePasswordDialog（Navbar 中 `v-model="isChangePasswordDialogVisible"`）、zs-select-dialog 等。

## 高度计算修复
- `calculateHeight()` 不再强制写死高度（`dialogElement.style.height = `${totalHeight}px``），改为 `dialogElement.style.height = 'auto'`，避免嵌套场景下 footer 贴错或溢出外层分页区域。
- 配套移除具体弹窗（如 `maintenanceItemDialog.vue`）的定制化 CSS 段落与 `custom-class`、`draggable=false`，恢复默认行为（来源会话 04d92724-d809-4b20-a0c6-fbdaca7dbf64）。

## 验证与归属
- 涉及文件：src/components/zs-dialog/zs-dialog.vue、layout/index.vue、dialogMixins.js、@zhi2-web-admin/src/layout/components/Navbar.vue、maintenanceItemDialog.vue。
- 所属项目：2-0（产品2.0）；来源会话：9385abcc-fd97-45d9-bf1e-ac59ebef7392, 04d92724-d809-4b20-a0c6-fbdaca7dbf64；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_vmodel",
  "source_extraction_id": "d8d41e069d6443dc9f8e058dc85da2fe",
  "version": 2,
  "memory_type": "entities"
}
-->