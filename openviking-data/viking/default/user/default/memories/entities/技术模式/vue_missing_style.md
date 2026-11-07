# Vue scoped样式块缺失结束标签致SCSS解析报错
在Vue单文件组件中，第一个`<style lang="scss" scoped>`块末尾若遗漏`</style>`，后续`<style lang="scss">`会被视为同一段SCSS，因语法非法报`expected selector`。

## 根因
- 缺失`</style>`使两个style块被合并解析，全局样式块被当作scoped块内的非法选择器

## 解决方案
- 在scoped样式块末尾补上`</style>`，再保留第二个无scoped的全局样式块
- 保存后Vite正常编译；若dev仍报错，重启一次`npm run dev`

## 涉及文件
- zhi2-web-admin/src/views/dataProperty/procedure/detail.vue
- zhi2-web-admin/src/views/dataProperty/procedure/components/procedureProcessTable.vue
- zhi2-web-admin/src/views/dataProperty/procedure/components/procedureProcessDialog.vue

## 验证与归属
- 所属项目：产品2.0；代码基线：none
- 验证证据：extracted source=cursor；来源会话ID：91caa295-2c37-448d-8386-139abc7c3402

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_missing_style",
  "source_extraction_id": "ad3a1acee02449ce9123ee7b8eb6e91c",
  "version": 1,
  "memory_type": "entities"
}
-->