- 习惯在双接口（列表主键+详情）均未完成时保持根节点 v-loading="loading"，用 try/finally 与 requestSeq 确保仅最后一次请求全部完成才关闭 loading，防止竞态。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "前端loading竞态处理",
  "source_extraction_id": "f9ec5b11ea454e45917b012e0977c33f",
  "version": 1,
  "memory_type": "preferences"
}
-->