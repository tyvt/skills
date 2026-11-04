- Quando `registerUrl` não está configurado, `goRegisterPage` deve remover lógica de fallback e apenas exibir a mensagem «未配置注册链接域名，请联系管理员在基本配置中设置» sem redirecionar.
- Quando `registerUrl` está configurado, redireciona para `<registerUrl>/#<path>?<query>` com salto de página inteira.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Redirecionamento de registerUrl no portal",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "preferences"
}
-->