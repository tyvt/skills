# zs-date-picker Vue3 v-model 走 props
产品2.0 搜索表单动态组件 zs-date-picker 在 Vue3 中须显式声明 modelValue prop，否则选中值无法回填。

## 问题根因
- 搜索表单项用 `<component :is="zs-date-picker" v-model="queryParams[...]">` 时，Vue3 的 `modelValue` 在 props 而非 `$attrs`。
- 若 `zs-date-picker` 只在 `$attrs` 读写，选中值无法回填且不会 emit `update:modelValue`。
- 搜索表单用 `<component :is="getComponentType()" v-model="queryParams[item.model]" v-bind="item.attrs" ...>` 渲染 zs-date-picker，Vue3 的 `v-model` 传 `modelValue` prop 并监听 `update:modelValue` 事件。
- 旧 zs-date-picker 仅在 `$attrs` 里找 `modelValue`（Vue3 中它在 props 上），导致 getter 读不到值、回填失败；setter 用 `'modelValue' in this.$attrs` 判断也失效。

## 解决方案
- 显式声明 `modelValue`（兼容旧 `value`），getter 优先 `modelValue`，setter 同时 `$emit('update:modelValue')` 与 `update:value`。
- 范围选择继续用 `update:start`/`update:end`。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：zs-search-form/SearchFormItem 动态组件 v-model 对比示例不生效，改组件 props。
- 涉及文件：zhi2-web-admin/src/components/zs-date-picker/zs-date-picker.vue、zhi2-web-admin/src/components/zs-search-form/SearchFormItem.vue。
- 具体位置：SearchFormItem.vue 49:51、zs-date-picker.vue 12:32。
- 所属项目：2-0（产品2.0）；来源会话：0c3557ae-26cf-42a4-8a27-e0d0002a07b4；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_date_picker_props",
  "source_extraction_id": "be1dcaaeb5e44bafa7edc576da65db74",
  "version": 2,
  "memory_type": "entities"
}
-->