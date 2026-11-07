# listMixins $options 判空修复
产品2.0（zhi2-web-admin）中 listMixins.js 的 data() 因 this.$options 可能为 undefined 而报错。

## 问题根因
- Vue 3 下某些组合式组件、mixin 复用场景中 this.$options 可能为 undefined
- 直接访问 this.$options.props 会抛出「Cannot read properties of undefined (reading 'props')」

## 解决方案
- 在 src/mixins/listMixins.js 的 data() 判断逻辑前增加 this.$options 判空：`if (!this.$options || !this.$options.props || !this.$options.props.desensitizeFlag)`

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 9b1d4896，runtime-core 报错 Cannot read properties of undefined，补 $options 判空
- 涉及文件：zhi2-web-admin/src/mixins/listMixins.js
- 所属项目：2-0（产品2.0）；来源会话：9b1d4896-b6df-43ec-8825-e0a68abff6e2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_options_nullcheck",
  "source_extraction_id": "eab15e2643d8472fb3c8ad4f437a0997",
  "version": 1,
  "memory_type": "entities"
}
-->