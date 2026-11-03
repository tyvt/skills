# zs-date-picker Vue3 v-model 走 props
产品2.0 搜索表单动态组件 zs-date-picker 在 Vue3 中须显式声明 modelValue prop，否则选中值无法回填。

## 问题根因
- 搜索表单项用 `<component :is="zs-date-picker" v-model="queryParams[...]">` 时，Vue3 的 `modelValue` 在 props 而非 `$attrs`。
- 若 `zs-date-picker` 只在 `$attrs` 读写，选中值无法回填且不会 emit `update:modelValue`。

## 解决方案
- 显式声明 `modelValue`（兼容旧 `value`），getter 优先 `modelValue`，setter 同时 `$emit('update:modelValue')` 与 `update:value`。
- 范围选择继续用 `update:start`/`update:end`。

## 验证与归属
- 验证证据：zs-search-form/SearchFormItem 动态组件 v-model 对比示例不生效，改组件 props。
- 涉及文件：zhi2-web-admin/src/components/zs-date-picker/zs-date-picker.vue、zhi2-web-admin/src/components/zs-search-form/SearchFormItem.vue。
- 所属项目：2-0（产品2.0）；来源会话：0c3557ae-26cf-42a4-8a27-e0d0002a07b4；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_date_picker_props",
  "source_extraction_id": "12e4b461564a49b89c97c402096a3c0d",
  "version": 1,
  "memory_type": "entities"
}
-->