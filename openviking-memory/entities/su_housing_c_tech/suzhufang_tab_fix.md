# 苏找房页切换Tab不请求接口修复
苏住房C小程序苏找房页（Project_Suzhufang.vue）因TabBar同时绑定v-model和自定义事件导致切换tab不请求列表接口，已修复。

## 问题原因
- ProjectTabBar同时写`v-model`和`@update:model-value`，uni-app中v-model绑定`update:modelValue`可能覆盖自定义事件
- 结果：tab高亮切换但`tabChange`不执行，`reload()`不调用，列表接口不重新请求

## 修复方案
- 去掉`v-model`，改为`:model-value` + `@update:model-value="tabChange"`
- 在`$nextTick`后再调用`reload()`，确保`curIndex`更新后触发分页请求

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：Project_Suzhufang.vue等
- 来源会话ID：6e707628-a295-466a-98ef-4fff34cf5423

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "suzhufang_tab_fix",
  "source_extraction_id": "7eca3a8230794a36a6dc360689fe3cb5",
  "version": 1,
  "memory_type": "entities"
}
-->