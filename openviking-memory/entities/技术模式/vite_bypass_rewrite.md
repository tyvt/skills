# vite_bypass_rewrite
No zhi2-web-admin (产品2.0), o `bypass` do Vite deve aplicar `rewrite` antes de montar o header de proxy.

## 问题背景
- O `bypass` usava `req.url` bruto para o header `frontend-proxy`, sem `rewrite`, exibindo caminho do frontend e não o endereço real de encaminhamento.

## 解决方案
- Reescrever `req.url` via `options.rewrite` antes de definir o header como endereço real de encaminhamento.
- Padrão geral: ao montar headers de proxy no dev server, usar o URL reescrito, não o bruto da requisição.

## 涉及文件与来源
- zhi2-web-admin/vite.config.js
- 来源会话：8199e2bb-60dc-46d6-9a57-47b7757e9d8b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_bypass_rewrite",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 1,
  "memory_type": "entities"
}
-->