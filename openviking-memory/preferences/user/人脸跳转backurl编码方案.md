- 跳转人脸 bdc 页面之前，须把完整的 backUrl 路径打印到控制台，便于排查第三方重定向异常。
- backUrl 必须做一层安全包装，固定采用 Base64 编码（而非 encodeURIComponent）后再作为 query 参数传给第三方（仅做标准 query 转义）。
- 原因：backUrl 内含 #、?、& 等特殊字符，不编码直接拼接会被截断或解析错乱；第三方按 Base64 方式解析 backUrl，误用 encodeURIComponent 会导致重定向异常，已改回 Base64 方案。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "人脸跳转backUrl编码方案",
  "source_extraction_id": "40cd8393981e48869460b2232fae40f9",
  "version": 1,
  "memory_type": "preferences"
}
-->