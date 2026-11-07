# Vue3 移除 $listeners 需 $attrs 透传
Vue3 移除 `$listeners`，事件监听合并至 `$attrs` 的 `onXxx`，组件访问即触发渲染警告。
## 问题根因
- Vue3 移除 `$listeners`，原生事件监听合并入 `$attrs.onXxx`，直接访问旧 `$listeners` 会触发渲染警告。
## 解决方案
- `zhi2-web-admin/src/components/zs-form/zs-form.vue` 设 `inheritAttrs:false`，用 computed 提取 `onXxx` 透传。
- `zhi2-web-admin/src/components/zs-input/zs-input.vue` 同步修改并保留 trim 逻辑。
## 验证与归属
- 验证证据：extracted source=cursor session=4bbb06e3-bf1a-42cc-9d14-5ef16c055799
- 涉及文件：zhi2-web-admin/src/components/zs-form/zs-form.vue、zhi2-web-admin/src/components/zs-input/zs-input.vue；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_listeners_attrs",
  "source_extraction_id": "8acaeb731028406db10b63ee3f286186",
  "version": 1,
  "memory_type": "entities"
}
-->