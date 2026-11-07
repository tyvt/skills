# analysisReport.vue 中 v-if 未挂载即调子组件 ref 方法致 undefined 报错
analysisReport.vue 的 getList() 赋值 assessmentId 后同步调用子组件 ref 方法，因 v-if 未渲染导致 undefined 报错。

## 问题根因
- getList() 赋值 assessmentId 后同步调用子组件 ref 方法
- 子组件通过 v-if 控制渲染，同步调用时尚未挂载，ref 为 undefined

## 解决方案
- 将子组件 ref 方法调用改到 this.$nextTick 中执行，确保 DOM 已更新
- 对 ref 使用可选链 ?. 做安全调用

## 验证与归属
- 所属项目：bugfix
- 验证证据：extracted source=cursor project=bugfix
- 验证证据：src=bugfix/002.md
- 涉及文件：analysisReport.vue
- 来源会话ID：230619a7-705b-45e2-8e99-9fb5aa4b094f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "analysisReport_vif_ref",
  "source_extraction_id": "429aaedba67c4a77a524e32086f608a8",
  "version": 1,
  "memory_type": "entities"
}
-->