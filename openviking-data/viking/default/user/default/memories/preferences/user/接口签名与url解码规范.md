- 接口签名前须去除参数字符串中的空格（如 `deptTree.vue` 中 `deptTypes` 由 `'A, 0'` 改为 `'A,0'`），避免空格导致签名原串偏差。
- `sign.js` 的 `parseQueryString()` 须增加 `+` 转空格后再 `decodeURIComponent`，确保 GET 参数签名值与后端一致。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "接口签名与URL解码规范",
  "source_extraction_id": "926112b8f1dd4580a35269f495566a01",
  "version": 1,
  "memory_type": "preferences"
}
-->