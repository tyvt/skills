- 使用 `formData.append('file', file)` 缺第三参数时浏览器会用 `file.name` 导致文件名未编码
- 习惯传 `encodeURIComponent(file.name)` 作第三参数，并要求后端取参用 `decodeURIComponent` 还原

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "FormData文件上传编码",
  "source_extraction_id": "1af5f05a76db443a9f62de599737d5e9",
  "version": 1,
  "memory_type": "preferences"
}
-->