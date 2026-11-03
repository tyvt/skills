- `src/views/property/complex/components/group-multi-select.vue` 的 get() 中直接 `this.$attrs.value.split(',')` 会在值为非字符串时渲染报错。
- 修复采用与 MultiSelect 一致的类型兼容方式改造，避免单点修复后他处复现。
- 验证证据：src=2-0/021.md；涉及文件：src/views/property/complex/components/group-multi-select.vue；来源会话：96cc05d6-f240-484b-bd44-cb2ed62f1ebc

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue组件get取值类型兼容",
  "source_extraction_id": "a5b508af35ef44519ddeab11320e8cba",
  "version": 1,
  "memory_type": "preferences"
}
-->