# 弹窗表单数组配置驱动渲染
property/complex 等弹窗表单改为 dialogFormItems 计算属性配置驱动，v-for 循环渲染 label/prop/layout/type/attrs，按 type 渲染 zs-date-picker，替代原硬编码与未驱动 contentInfo。

## 问题根因
- zhi2-web-admin/src/views/property/complex/index.vue 弹窗表单原硬编码且 contentInfo 未驱动渲染

## 解决方案
- 弹窗表单改为 dialogFormItems 计算属性配置驱动
- v-for 循环渲染 label/prop/layout/type/attrs
- 按 type 渲染 zs-date-picker，替代原硬编码

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/complex/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/creditDeclarationComponents/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/transaction/transferDiscount/index.vue

## 验证与归属
- 验证证据：extracted source=cursor session=b13808d4-8e61-472e-9b96-c5618a65f78f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_formitems_config",
  "source_extraction_id": "d50e546115c8453f98a64d69c3ed6dce",
  "version": 1,
  "memory_type": "entities"
}
-->