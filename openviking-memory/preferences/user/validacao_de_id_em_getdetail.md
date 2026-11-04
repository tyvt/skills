- 混入 `form.js` 的 `getDetail()` 使用 `validateDetailRequiredParams()`，该函数默认要求 `id`，导致无 `id` 的接口（例如：`platformConfig/detail.vue` 重写了 `detailApiFull`）失败并触发请求。
- 为了适配无 `id` 的接口，在 `detail.vue` 中重写 `getDetailRequiredParams()`，移除对 `id` 的必填约束。
- 验证：证据 产品2.0/064.md; 会话 aac565c5。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 在 getDetail 中验证 id",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 1,
  "memory_type": "preferences"
}
-->
