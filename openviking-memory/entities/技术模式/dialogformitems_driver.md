# Dialog Form Items Config Driver
对话框表单基于配置渲染的重构模式。

## 实现
- 在 `zhi2-web-admin/src/views/property/complex/index.vue` 中，将硬编码的表单替换为计算属性 `dialogFormItems`，该属性配置 `label/prop/layout/type/attrs`。
- 使用 `v-for` 渲染表单项，并根据 `type` 渲染 `zs-date-picker`，消除未受控的 `contentInfo`。

## 涉及文件
- zhi2-web-admin/src/views/property/complex/index.vue
- zhi2-web-admin/src/views/evaluation/creditDeclarationComponents/detail.vue
- zhi2-web-admin/src/views/transaction/transferDiscount/index.vue

## 验证
- 来源: cursor session=b13808d4-8e61-472e-9b96-c5618a65f78f
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialogformitems_driver",
  "source_extraction_id": "e1e9f73408db4b68b85692c1f86358e5",
  "version": 1,
  "memory_type": "entities"
}
-->