- zhi2-web-admin 仅 public/assets/js/element-ui.js 命中关键词，无 openai/anthropic/langchain/litellm 调用，headroom 库模式 compress(messages) 无作用对象
- 有效代理模式（headroom wrap claude / headroom proxy --port 8787）需常驻代理、全局配置及 GB 级依赖（torch、transformers、onnxruntime、sqlite-vec），与零配置轻量偏好冲突且 pi 框架自管请求，故不引入 headroom 库
- 验证证据：src=苏州市房地产监测V3-leftover/128.md；涉及文件：public/assets/js/element-ui.js；来源会话：01a16d4f-9eb9-7048-964a-22741d50bcaa

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "headroom库模式不引入",
  "source_extraction_id": "07c2d7124c274e7c976432390b07e669",
  "version": 1,
  "memory_type": "preferences"
}
-->