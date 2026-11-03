# listMixins data() 访问 $options.props 抛 undefined
列表重置场景下 listMixins.js 的 data() 直接读取 this.$options.props 在 Vue3 部分混用场景会炸。
## 问题描述
- 列表重置（resetQuery / 搜索表单重置）报 Cannot read properties of undefined (reading 'props')
- 堆栈落在 listMixins.js 的 data() 方法
## 根因
- Vue3 与某些 mixin/组合式混用场景下 this.$options 可能为 undefined
- 直接读 this.$options.props 会抛错
## 解决方案
- 判空链改为 `if (!this.$options || !this.$options.props || !this.$options.props.desensitizeFlag)` 再写默认 desensitizeFlag
- 凡在 data() 里读 $options 的 mixin 都应同样防护
## 验证与归属
- 涉及文件：zhi2-web-admin/src/mixins/listMixins.js
- 所属项目：2-0；代码基线：none
- 验证证据：会话 9b1d4896 listMixins.js:16 与 zs-search-form 重置触发报错，结论为先对 $options 判空
- 来源会话ID：9b1d4896-b6df-43ec-8825-e0a68abff6e2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_data_options",
  "source_extraction_id": "02b92ee3ef8445aa8281fd7042ea17fa",
  "version": 1,
  "memory_type": "entities"
}
-->