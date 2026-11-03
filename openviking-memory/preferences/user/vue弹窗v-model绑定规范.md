- 弹窗组件统一采用 `v-model` 绑定，全项目将 `v-model:visible=` 批量替换为 `v-model=`。
- `zs-dialog` 组件增加 `modelValue` prop 及计算属性 `dialogVisible`（`modelValue ?? this.$attrs.visible`），关闭时 emit `update:modelValue`。
- `attachmentDraw.vue` 移除 `visible` prop、`update:visible` 事件及 `drawerVisible` 计算属性，仅支持 `modelValue` 与 `update:modelValue`；父组件 `OperationBtnGroup/index.vue` 改回 `v-model="showAnnexDialog"` 解决打不开问题（验证：src=2-0/011.md）。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue弹窗v-model绑定规范",
  "source_extraction_id": "e1697a5b28f1459ca244bb8203dedf0c",
  "version": 2,
  "memory_type": "preferences"
}
-->