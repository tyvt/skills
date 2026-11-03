- `form.js` 的 `validateDetailRequiredParams()` 仅校验页面声明必需参数，不再于 `getDetailRequiredParams()` 外强制合并 `primaryKey` 与 `id`
- 新增 `isDetailIdRequired()` 依据 `detailApiFull` 判断 `id` 必要性，固定路径不拦截
- 可通过重写 `getDetailRequiredParams()` 覆盖默认校验
- `platformConfig/detail.vue` 新增 `getDetailParams()` 返回空对象以适配无需 `id` 的 `getInfo` 约定，普通详情页默认行为不变
- 验证：src=苏州市房地产监测V3-rest/147.md（来源会话 a93895cc-33d7-4c71-899b-f31458cbb86c）；src=园区公共收益/039.md（来源会话 53746354-b471-423b-8e12-527f9a697944）；代码基线 none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "form.js详情id校验规则",
  "source_extraction_id": "af2ecf77822d4bf7806bf1020bbc0366",
  "version": 2,
  "memory_type": "preferences"
}
-->