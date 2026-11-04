- 后端 /security/public-key 返回空导致前端启动中止仅留 Loading 时，改动 main.js、keyExchange.js 使公钥空报错并替换 Loading 为错误重试，而非静默挂起
- 需临时跳过加密时，改 env/.env.local 的 VITE_CRYPTO_ENABLED 为 false
- 来源会话：rollout-2026-08-24T14-55-34-01a0328d-95bc-7e20-aa03-f13206d9bd95

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "publickey_error_handling",
  "source_extraction_id": "fd1b47eb3bcb433ea6893a896f117554",
  "version": 1,
  "memory_type": "preferences"
}
-->