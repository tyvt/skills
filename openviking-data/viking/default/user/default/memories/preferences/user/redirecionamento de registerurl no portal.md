- 当 `registerUrl` 未配置时，`goRegisterPage` 应移除 fallback 逻辑，仅显示消息 «未配置注册链接域名，请联系管理员在基本配置中设置» 而不重定向。
- 当 `registerUrl` 已配置时，重定向到 `<registerUrl>/#<path>?<query>`，采用整页跳转。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Redirecionamento de registerUrl no portal",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "preferences"
}
-->