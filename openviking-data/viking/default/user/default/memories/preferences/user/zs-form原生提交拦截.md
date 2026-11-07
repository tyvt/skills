- `zs-form` 底层是 Element UI 的 `el-form`，会渲染原生 `<form>`；未在根节点写 `@submit.native.prevent` 时，表单内按 Enter 或默认提交会触发浏览器 GET 整页刷新。
- 所有 `zs-form` 根节点须统一加 `@submit.native.prevent`，与 `accountInfo.vue` 保持一致，避免「像点了按钮就刷新」的误判。
- 已对 `companyInfo.vue`（路径 src/views/register/components/companyInfo.vue）补加该修饰符。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zs-form原生提交拦截",
  "source_extraction_id": "ffb2d2ed06a841aba149665233cf4066",
  "version": 1,
  "memory_type": "preferences"
}
-->