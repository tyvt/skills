---
audit_status: invalid
last_checked: 2026-11-26T16:43:13+08:00
verdict_note: 产品2.0 dialogMixins.js 全文无 $attrs.modelValue/visible 读取，仅见 emit(update-visible)；描述的 v-model 透传机制无法证实。
---
# 弹窗mixin借$attrs透传v-model免声明
Vue 3 中弹窗 mixin 借 `$attrs` 透传 `v-model` 相关属性，父级无需显式绑定。

## 解决方案
- 未声明的 `modelValue` 与 `visible` 进入 `$attrs`
- `dialogMixins.js` 移除对应 props 声明，改由 `this.$attrs.modelValue ?? this.$attrs.visible` 读取状态
- 配合 `<zs-dialog v-bind="$attrs">`，所有引用该 mixin 的弹窗无需在父级显式绑定 `:model-value` 与事件

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/009.md
- 涉及文件：dialogMixins.js、ArchiveDetailDialog.vue（已还原，移除单独加的 :model-value 与 @update:model-value 两行）
- 来源会话：42e79baa-7d82-4041-a640-3f06d3408440；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_mixin_vmodel",
  "source_extraction_id": "8a9af5502aec47c3be80b7a1a22b0f05",
  "version": 2,
  "memory_type": "entities"
}
-->