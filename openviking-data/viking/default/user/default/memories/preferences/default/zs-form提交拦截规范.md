- `zs-form` 底层为原生 `el-form`，未添加 `@submit.native.prevent` 时按 Enter 会触发浏览器原生 GET 提交导致整页刷新。
- 根 `zs-form` 应添加 `@submit.native.prevent` 修饰符以拦截默认提交；`companyInfo.vue` 已补齐并与 `accountInfo.vue` 保持一致的提交拦截规范。

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "zs-form提交拦截规范",
  "source_extraction_id": "f73dc77955f14b0ab4b4e23663c92a82",
  "version": 1,
  "memory_type": "preferences"
}
-->