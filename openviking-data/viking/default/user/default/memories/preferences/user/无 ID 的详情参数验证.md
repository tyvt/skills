- 原因: `zhi2-web-admin/src/mixins/form.js` 中的 `validateDetailRequiredParams()` 强制在 `getDetailRequiredParams()` 之外合并 `primaryKey` 和 `id`，导致 `platformConfig/detail.vue` (无 id) 因缺少参数而跳过请求。
- 修正: `form.js` 改为仅验证页面声明的必需参数；`platformConfig/detail.vue` 添加 `getDetailParams()` 返回空对象以适应无 id 的约定；普通页面不变。
- 验证证据: src=苏州市房地产监测V3/187.md; 会话: a93895cc-33d7-4c71-899b-f31458cbb86c

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：a93895cc-33d7-4c71-899b-f31458cbb86c


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "无 ID 的详情参数验证",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 1,
  "memory_type": "preferences"
}
-->
