- Em produção exige resolução de caminho relativo: `VITE_APP_BASE_API` em `.env` deve ser `api/v2.0`
- Chave de `proxy` do Vite deve iniciar com `/`; `vite.config.js` adiciona `/` via `proxyApiPath` para proxy dev, `env/.env` mantém relativo


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Configuração de caminho de API em produção",
  "source_extraction_id": "f4d822fa0406486f806abebe26b378ee",
  "version": 1,
  "memory_type": "preferences"
}
-->