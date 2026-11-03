- backUrl 含 #、?、& 等特殊字符时，直接拼接 query 会截断或解析错乱；采用 Base64 编码完整回跳地址后作 query 参数传递，第三方 atob 解码，避免 encodeURIComponent 与解析方式不匹配。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "backUrl特殊字符Base64编码",
  "source_extraction_id": "33d3bb10c5974475b872c4caf7399a25",
  "version": 1,
  "memory_type": "preferences"
}
-->